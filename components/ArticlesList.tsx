"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  IconEdit,
  IconEye,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { ArticleType } from "@/types";
import { capitalizeSentences, formatDate } from "@/lib/utils";
import Loader from "@/components/Loader";
import DeleteArticleDialog from "./admin/DeleteArticleDialog";
import { deleteArticle } from "@/server/actions/article";

const columnHelper = createColumnHelper<ArticleType>();

const ArticlesList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    article: ArticleType | null;
  }>({
    isOpen: false,
    article: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();

  // Fetch articles data
  const {
    data: articles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: () => fetch("/api/articles").then((res) => res.json()),
  });

  // Handle delete action
  const handleDeleteClick = (article: ArticleType) => {
    setDeleteDialog({
      isOpen: true,
      article,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.article) return;

    setIsDeleting(true);
    try {
      const articleId = deleteDialog.article.id;

      if (!articleId) {
        toast.error("Invalid article ID");
        setIsDeleting(false);
        return;
      }

      const result = await deleteArticle(articleId);

      if (result.success) {
        toast.success("Article deleted successfully");
        // Invalidate and refetch articles
        queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
        setDeleteDialog({ isOpen: false, article: null });
      } else {
        toast.error(result.message || "Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, article: null });
  };

  // Define columns
  const columns = useMemo<ColumnDef<ArticleType, any>[]>(
    () => [
      columnHelper.accessor("featuredImageUrl", {
        header: "Image",
        cell: (info) => (
          <div className="w-16 h-12 relative rounded-md overflow-hidden">
            {info.getValue() ? (
              <Image
                src={info.getValue()}
                alt="Article thumbnail"
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-400">No image</span>
              </div>
            )}
          </div>
        ),
        enableSorting: false,
        enableGlobalFilter: false,
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => (
          <div className="max-w-xs">
            <p className="font-medium text-sm text-gray-900 truncate">
              {capitalizeSentences(info.getValue().toLowerCase())}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {info.getValue()}
          </Badge>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <Badge
              variant={status === "published" ? "default" : "secondary"}
              className={
                status === "published"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {capitalizeSentences(status)}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Created",
        cell: (info) => (
          <span className="text-sm text-gray-600">
            {formatDate(new Date(info.getValue()))}
          </span>
        ),
      }),
      columnHelper.accessor("updatedAt", {
        header: "Updated",
        cell: (info) => (
          <span className="text-sm text-gray-600">
            {formatDate(new Date(info.getValue()))}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const article = info.row.original;
          return (
            <div className="flex items-center gap-2">
              <Link href={`/articles/${article.slug}`} target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <IconEye className="h-4 w-4 text-blue-600" />
                </Button>
              </Link>
              <Link href={`/admin/articles/edit/${article.slug}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-green-100"
                >
                  <IconEdit className="h-4 w-4 text-green-600" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-red-100"
                onClick={() => handleDeleteClick(article)}
              >
                <IconTrash className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          );
        },
        enableSorting: false,
        enableGlobalFilter: false,
      }),
    ],
    []
  );

  // Initialize table
  const table = useReactTable({
    data: articles,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10, // Already set to 10 articles per page
      },
    },
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading articles: {error?.message}</p>
      </div>
    );
  }

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const startRow = table.getState().pagination.pageIndex * pageSize + 1;
  const endRow = Math.min(
    (table.getState().pagination.pageIndex + 1) * pageSize,
    table.getFilteredRowModel().rows.length
  );
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
          <p className="text-gray-600">
            Manage your articles ({articles.length} total)
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button className="cursor-pointer">Create Article</Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search articles..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 bg-zinc-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-2 hover:text-gray-700"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <IconSortAscending className="h-4 w-4" />,
                            desc: <IconSortDescending className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startRow}</span> to{" "}
            <span className="font-medium">{endRow}</span> of{" "}
            <span className="font-medium">{totalRows}</span> articles
          </p>

          {/* Page indicator */}
          <p className="text-sm text-gray-500">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1"
          >
            <IconChevronsLeft className="h-4 w-4" />
            <span className="hidden sm:inline">First</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-1"
          >
            <IconChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-1"
          >
            <span className="hidden sm:inline">Last</span>
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteArticleDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        article={deleteDialog.article}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ArticlesList;
