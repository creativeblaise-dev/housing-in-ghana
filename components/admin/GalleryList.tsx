"use client";

import React, { useState } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/spotlight";
import { capitalizeSentences, cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconMapPin,
  IconPhoto,
} from "@tabler/icons-react";
import Loader from "@/components/Loader";
import { MileagePost } from "@/types";

interface MileageGalleriesProps {
  header?: string;
  showSearch?: boolean;
  itemsPerPage?: number;
}

const GalleryList: React.FC<MileageGalleriesProps> = ({
  header = "Mileage Galleries",
  showSearch = true,
  itemsPerPage = 9,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch mileage galleries
  const {
    data: galleries = [],
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["mileage-galleries"],
    queryFn: () => fetch("/api/mileage").then((res) => res.json()),
  });

  // Ensure galleries is an array to prevent filter errors
  const galleriesArray = Array.isArray(galleries) ? galleries : [];

  // Filter galleries based on search
  const filteredGalleries = galleriesArray.filter((gallery: MileagePost) => {
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

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (isFetching) return <Loader />;

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
    <div className="relative flex pt-5 w-full overflow-hidden bg-[url('/images/prydumano-design-vIbxvHj9m9g-unsplash.jpg')] bg-center [background-size:cover] antialiased md:items-center md:justify-center px-10 md:px-20 pb-10 md:py-15">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[#000000c3] select-none"
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-10"
        fill="white"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#efefef] mb-2">{header}</h1>
            <p className="text-gray-300">
              Explore beautiful places across Ghana ({galleriesArray.length}{" "}
              galleries)
            </p>
          </div>
        </div>

        {/* Search Filter */}
        {showSearch && (
          <div className="mb-8">
            <div className="relative max-w-md">
              <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by place name, region, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300"
              />
            </div>
          </div>
        )}

        {/* Galleries Grid */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-0 lg:py-8 mx-auto">
          {paginatedGalleries.length === 0 ? (
            <div className="text-center py-12">
              <IconPhoto className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No galleries found
              </h3>
              <p className="text-gray-300">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "No mileage galleries available yet"}
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {paginatedGalleries.map((gallery: MileagePost) => {
                const coverPhoto =
                  gallery.photos[0] || "/images/default-gallery-cover.jpg";

                return (
                  <Link
                    key={gallery.id}
                    className="group relative block rounded-xl focus:outline-hidden"
                    href={`/mileage/gallery/${gallery.id}`}
                  >
                    <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-67.5 before:absolute before:inset-x-0 before:z-1 before:size-full before:bg-linear-to-t before:from-stone-900/90 border-2 border-[#FFFFFF]/50">
                      <OptimizedImage
                        className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={coverPhoto}
                        width={1000}
                        height={1000}
                        alt={`${gallery.placeName} gallery`}
                      />
                    </div>

                    {/* Top Badge - Region */}
                    <div className="absolute top-0 inset-x-0 z-10">
                      <div className="p-4 flex flex-col h-full sm:p-6">
                        <div className="flex items-center">
                          <div className="ms-2.5 sm:ms-4">
                            <h4 className="text-white text-xs leading-relaxed px-3 py-1.5 bg-[#ff202bb9] rounded-full inline-flex items-center gap-1">
                              <IconMapPin className="w-3 h-3" />
                              {gallery.region}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 inset-x-0 z-10">
                      <div className="flex flex-col h-full p-4 sm:p-6">
                        <h3 className="text-xl lg:text-1xl font-semibold leading-tight text-white group-hover:text-white/80 group-focus:text-white/80">
                          {capitalizeSentences(gallery.placeName.toLowerCase())}
                        </h3>

                        {gallery.description && (
                          <p className="mt-2 text-white/80 text-sm line-clamp-2">
                            {gallery.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-white/80 flex items-center gap-1">
                            <IconPhoto className="w-3 h-3" />
                            {gallery.photos.length} photo
                            {gallery.photos.length !== 1 ? "s" : ""}
                          </p>
                          <span className="text-xs text-white/60 bg-black/30 px-2 py-1 rounded">
                            View Gallery
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-xl" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-4 mt-8">
            {/* Results Info */}
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredGalleries.length)}{" "}
                of {filteredGalleries.length} galleries
                {searchQuery &&
                  ` (filtered from ${galleriesArray.length} total)`}
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* First Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                <IconChevronsLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">First</span>
              </Button>

              {/* Previous Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                <IconChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {totalPages <= 7
                  ? // Show all pages if total is 7 or less
                    Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? "bg-[#FF202B] text-white hover:bg-[#FF202B]/90"
                              : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                          }
                        >
                          {page}
                        </Button>
                      )
                    )
                  : // Show smart pagination for more than 7 pages
                    getPageNumbers()
                      .filter((item) => item !== undefined)
                      .map((page, index) => (
                        <React.Fragment key={index}>
                          {page === "..." ? (
                            <span className="px-2 text-white/60">...</span>
                          ) : (
                            <Button
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setCurrentPage(page as number)}
                              className={
                                currentPage === page
                                  ? "bg-[#FF202B] text-white hover:bg-[#FF202B]/90"
                                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                              }
                            >
                              {page}
                            </Button>
                          )}
                        </React.Fragment>
                      ))}
              </div>

              {/* Next Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <IconChevronRight className="w-4 h-4" />
              </Button>

              {/* Last Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                <span className="hidden sm:inline mr-1">Last</span>
                <IconChevronsRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Page Jump (for large datasets) */}
            {totalPages > 10 && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-gray-300">Go to page:</span>
                <Input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  className="w-16 h-8 text-center bg-white/10 border-white/20 text-white"
                />
                <span className="text-sm text-gray-300">of {totalPages}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryList;
