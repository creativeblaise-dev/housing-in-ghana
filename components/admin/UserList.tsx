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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconUserCheck,
  IconUserX,
  IconShield,
  IconUser,
} from "@tabler/icons-react";
import { capitalizeSentences, formatDate } from "@/lib/utils";
import Loader from "@/components/Loader";
import DeleteUserDialog from "./DeleteUserDialog";
import {
  deleteUser,
  updateUserRole,
  toggleUserStatus,
} from "@/server/actions/users";
import { UserType } from "../../types";
import { useRouter } from "next/navigation";
// User type definition

const columnHelper = createColumnHelper<UserType>();

const UsersList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    user: UserType | null;
  }>({
    isOpen: false,
    user: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingRoles, setUpdatingRoles] = useState<Set<string>>(new Set());
  const [updatingStatus, setUpdatingStatus] = useState<Set<string>>(new Set());

  const queryClient = useQueryClient();

  const router = useRouter();

  // Fetch users data
  const {
    data: users = [] as UserType[],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/users");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to fetch users');
      }

      // Return the data array from the API response
      return result.success ? result.data : [];
    },
  });

  // Handle role change
  const handleRoleChange = async (
    userId: string,
    newRole: UserType["role"]
  ) => {
    setUpdatingRoles((prev) => new Set([...prev, userId]));

    try {
      const result = await updateUserRole(userId, newRole);

      if (result.success) {
        toast.success(`User role updated to ${newRole.toLowerCase()}`);
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });

        // If the current user updated their own role to non-admin, redirect to home
        const currentUserId = userId; // Replace with actual current user ID
        if (userId === currentUserId && newRole !== "admin") {
          router.replace("/");
        }
      } else {
        toast.error("Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setUpdatingRoles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  // Handle status toggle
  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    setUpdatingStatus((prev) => new Set([...prev, userId]));

    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const result = await toggleUserStatus(userId, newStatus);

      if (result.success) {
        toast.success(`User ${newStatus.toLowerCase()}`);
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      } else {
        toast.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setUpdatingStatus((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  // Handle delete action
  const handleDeleteClick = (user: UserType) => {
    setDeleteDialog({
      isOpen: true,
      user,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.user) return;

    setIsDeleting(true);
    try {
      const userId = deleteDialog.user.id;

      const result = await deleteUser(userId);

      if (result.success) {
        toast.success("User deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        setDeleteDialog({ isOpen: false, user: null });
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, user: null });
  };

  // Define columns
  const columns = useMemo<ColumnDef<UserType, any>[]>(
    () => [
      columnHelper.accessor("image", {
        header: "Avatar",
        cell: (info) => {
          const user = info.row.original;
          return (
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              {info.getValue() ? (
                <Image
                  src={info.getValue()}
                  alt={`${user.name || user.email} avatar`}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <IconUser className="w-5 h-5 text-gray-500" />
                </div>
              )}
            </div>
          );
        },
        enableSorting: false,
        enableGlobalFilter: false,
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => {
          const user = info.row.original;
          return (
            <div className="max-w-xs">
              <p className="font-medium text-sm text-gray-900">
                {user.name || "No name"}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          );
        },
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => {
          const user = info.row.original;
          const isUpdating = updatingRoles.has(user.id);

          return (
            <Select
              value={info.getValue()}
              onValueChange={(value: UserType["role"]) =>
                handleRoleChange(user.id, value)
              }
              disabled={isUpdating}
            >
              <SelectTrigger className="w-24 h-8">
                <SelectValue>
                  <div className="flex items-center gap-1">
                    {info.getValue() === "admin" ? (
                      <IconShield className="w-3 h-3" />
                    ) : (
                      <IconUser className="w-3 h-3" />
                    )}
                    <span className="text-xs">
                      {isUpdating ? "..." : info.getValue()}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subscriber">
                  <div className="flex items-center gap-2">
                    <IconUser className="w-4 h-4" />
                    Subscriber
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <IconShield className="w-4 h-4" />
                    Admin
                  </div>
                </SelectItem>
                <SelectItem value="super_admin">
                  <div className="flex items-center gap-2">
                    <IconShield className="w-4 h-4" />
                    Super Admin
                  </div>
                </SelectItem>
                <SelectItem value="contributor">
                  <div className="flex items-center gap-2">
                    <IconUser className="w-4 h-4" />
                    Contributor
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const user = info.row.original;
          const isUpdating = updatingStatus.has(user.id);

          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStatusToggle(user.id, status)}
              disabled={isUpdating}
              className="h-8 px-3"
            >
              <Badge
                variant={status === "active" ? "default" : "secondary"}
                className={`cursor-pointer ${status === "active"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : status === "inactive"
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                  }`}
              >
                {isUpdating ? "...updating" : capitalizeSentences(status || "unknown")}
              </Badge>
            </Button>
          );
        },
      }),
      columnHelper.accessor("_count", {
        header: "Articles",
        cell: (info) => {
          const count = info.getValue()?.articles || 0;
          return (
            <span className="text-sm text-gray-600 font-medium">{count}</span>
          );
        },
      }),
      columnHelper.accessor("lastLogin", {
        header: "Last Login",
        cell: (info) => {
          const lastLogin = info.getValue();
          return (
            <span className="text-sm text-gray-600">
              {lastLogin ? formatDate(new Date(lastLogin)) : "Never"}
            </span>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: "Joined",
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
          const user = info.row.original;
          const isCurrentUser = false; // You'll need to check if this is the current logged-in user

          return (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-blue-100"
                onClick={() => {
                  // Handle view user profile or edit
                  toast.info("Edit user functionality not implemented");
                }}
              >
                <IconEdit className="h-4 w-4 text-blue-600" />
              </Button>

              {!isCurrentUser && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 ${user.status === "active"
                      ? "hover:bg-yellow-100"
                      : "hover:bg-green-100"
                      }`}
                    onClick={() => handleStatusToggle(user.id, user.status)}
                    disabled={updatingStatus.has(user.id)}
                  >
                    {user.status === "active" ? (
                      <IconUserX className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <IconUserCheck className="h-4 w-4 text-green-600" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <IconTrash className="h-4 w-4 text-red-600" />
                  </Button>
                </>
              )}
            </div>
          );
        },
        enableSorting: false,
        enableGlobalFilter: false,
      }),
    ],
    [updatingRoles, updatingStatus]
  );

  // Initialize table
  const table = useReactTable({
    data: Array.isArray(users) ? users : [],
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
        pageSize: 10,
      },
    },
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading users: {error?.message}</p>
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
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-600">
            Manage user accounts and permissions ({Array.isArray(users) ? users.length : 0} total)
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            {Array.isArray(users) ? users.filter((user: UserType) => user.status === "active").length : 0}{" "}
            Active
          </Badge>
          <Badge variant="outline" className="text-red-700 border-red-300">
            {Array.isArray(users) ? users.filter((user: UserType) => user.role === "admin").length : 0}{" "}
            admins
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startRow}</span> to{" "}
            <span className="font-medium">{endRow}</span> of{" "}
            <span className="font-medium">{totalRows}</span> users
          </p>

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
      <DeleteUserDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        user={deleteDialog.user}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default UsersList;
