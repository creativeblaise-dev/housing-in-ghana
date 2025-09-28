"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  IconSearch,
  IconEye,
  IconEdit,
  IconCalendar,
  IconBook,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconDownload,
} from "@tabler/icons-react";
import { formatDate } from "@/lib/utils";
import Loader from "@/components/Loader";
import { MagazineEdition } from "@/types";

const MagazineEditions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  // Fetch magazine editions
  const {
    data: editions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["magazine-editions"],
    queryFn: () => fetch("/api/magazine").then((res) => res.json()),
  });

  // Filter editions based on search
  const filteredEditions = editions.filter((edition: MagazineEdition) => {
    const matchesSearch =
      edition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Edition ${edition.editionNumber}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEditions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEditions = filteredEditions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          Error loading magazine editions: {error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Magazine Editions
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your Housing In Ghana magazine editions ({editions.length}{" "}
            total)
          </p>
        </div>
        <Link href="/admin/magazine/new">
          <Button className="flex items-center gap-2">
            <IconPlus className="w-4 h-4" />
            Create New Edition
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Editions</p>
              <p className="text-2xl font-bold text-gray-900">
                {editions.length}
              </p>
            </div>
            <IconBook className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-blue-600">
                {/* {editions.reduce(
                  (sum: number, e: MagazineEdition) =>
                    sum + (e.downloadCount || 0),
                  0
                )} */}{" "}
                0
              </p>
            </div>
            <IconDownload className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pages</p>
              <p className="text-2xl font-bold text-green-600">
                {/* {editions.reduce(
                  (sum: number, e: MagazineEdition) =>
                    sum + (e.pageCount || 0),
                  0
                )} */}{" "}
                0
              </p>
            </div>
            <IconBook className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search editions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-100"
          />
        </div>
      </div>

      {/* Magazine Cards Grid */}
      {paginatedEditions.length === 0 ? (
        <div className="text-center py-12">
          <IconBook className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No editions found
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? "Try adjusting your search query"
              : "Create your first magazine edition to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedEditions.map((edition: MagazineEdition) => (
            <div
              key={edition.editionNumber}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
            >
              {/* Cover Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={
                    edition.coverImage || "/images/default-magazine-cover.jpg"
                  }
                  alt={`${edition.title} cover`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Edition Number Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="default"
                    className="bg-black/70 text-white font-bold"
                  >
                    Edition {edition.editionNumber}
                  </Badge>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {edition.title}
                </h3>

                {edition.summary && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {edition.summary}
                  </p>
                )}

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <IconCalendar className="w-4 h-4 mr-2" />
                    Published {formatDate(new Date(edition.releasedAt))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <IconBook className="w-4 h-4 mr-1" />
                      {/* {edition.pageCount || 0} pages */} 0 pages
                    </div>
                    <div className="flex items-center">
                      <IconDownload className="w-4 h-4 mr-1" />
                      {/* {edition.downloadCount || 0} downloads */} 0 downloads
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/magazine/edition/0${edition.editionNumber}`}
                    className="flex-1"
                  >
                    <Button variant="default" size="sm" className="w-full">
                      <IconEye className="w-4 h-4 mr-2" />
                      View Edition
                    </Button>
                  </Link>

                  <Link href={`/admin/magazine/${edition.editionNumber}/edit`}>
                    <Button variant="outline" size="sm">
                      <IconEdit className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredEditions.length)} of{" "}
            {filteredEditions.length} editions
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <IconChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <IconChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagazineEditions;
