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
  IconTrash,
  IconMapPin,
  IconPhoto,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
} from "@tabler/icons-react";
import { capitalizeSentences } from "@/lib/utils";
import Loader from "@/components/Loader";
import { MileagePost } from "@/types";
import { getImageUrl } from "@/lib/image-utils";

const AdminMileageGalleries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  const placeholderImage = getImageUrl("/images/default-gallery-cover.jpg");

  // Fetch mileage galleries
  const {
    data: galleries = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-mileage-galleries"],
    queryFn: () => fetch("/api/mileage").then((res) => res.json()),
  });

  // Filter galleries based on search
  const filteredGalleries = galleries.filter((gallery: MileagePost) => {
    const matchesSearch =
      gallery.placeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gallery.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gallery.description &&
        gallery.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGalleries = filteredGalleries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get unique regions for stats
  const uniqueRegions = [
    ...new Set(galleries.map((g: MileagePost) => g.region)),
  ];
  const totalPhotos = galleries.reduce(
    (sum: number, g: MileagePost) => sum + g.photos.length,
    0
  );

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          Error loading galleries: {error?.message}
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
            Mileage Galleries
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your mileage galleries ({galleries.length} total)
          </p>
        </div>
        <Link href="/admin/mileage/new">
          <Button className="flex items-center gap-2">
            <IconPlus className="w-4 h-4" />
            Create New Gallery
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Galleries</p>
              <p className="text-2xl font-bold text-gray-900">
                {galleries.length}
              </p>
            </div>
            <IconPhoto className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Photos</p>
              <p className="text-2xl font-bold text-blue-600">{totalPhotos}</p>
            </div>
            <IconPhoto className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Regions Covered</p>
              <p className="text-2xl font-bold text-green-600">
                {uniqueRegions.length}
              </p>
            </div>
            <IconMapPin className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by place name, region, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-100"
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {paginatedGalleries.length === 0 ? (
        <div className="text-center py-12">
          <IconPhoto className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No galleries found
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? "Try adjusting your search query"
              : "Create your first mileage gallery to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedGalleries.map((gallery: MileagePost) => {
            const coverPhoto = gallery.photos[0] || `${placeholderImage}`;

            return (
              <div
                key={gallery.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group"
              >
                {/* Cover Image with Gallery Card Styling */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={coverPhoto}
                    alt={`${gallery.placeName} gallery`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Region Badge - Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-[#FF202B] text-white font-medium px-3 py-1 flex items-center gap-1">
                      <IconMapPin className="w-3 h-3" />
                      {gallery.region}
                    </Badge>
                  </div>

                  {/* Photo Count Badge - Top Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-black/70 text-white font-medium px-3 py-1 flex items-center gap-1">
                      <IconPhoto className="w-3 h-3" />
                      {gallery.photos.length}
                    </Badge>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Bottom Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {capitalizeSentences(gallery.placeName.toLowerCase())}
                    </h3>
                    {gallery.description && (
                      <p className="text-white/80 text-sm line-clamp-2">
                        {gallery.description}
                      </p>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/mileage/gallery/${gallery.id}`}
                      className="flex-1"
                    >
                      <Button variant="default" size="sm" className="w-full">
                        <IconEye className="w-4 h-4 mr-2" />
                        View Gallery
                      </Button>
                    </Link>

                    <Link href={`/admin/mileage/${gallery.id}/edit`}>
                      <Button variant="outline" size="sm" className="px-3">
                        <IconEdit className="w-4 h-4" />
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 hover:bg-red-50 hover:border-red-200"
                      onClick={() => {
                        // Handle delete
                        console.log("Delete gallery:", gallery.id);
                      }}
                    >
                      <IconTrash className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredGalleries.length)} of{" "}
            {filteredGalleries.length} galleries
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

export default AdminMileageGalleries;
