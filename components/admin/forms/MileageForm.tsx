"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Loader2, X, GripVertical } from "lucide-react";
import { FeaturedImageData, MileageFormData } from "@/types";
import { createMileagePostSchema } from "@/lib/validations";
import MultiFileUpload from "@/components/ui/multi-file-upload";
import { createMileagePost } from "@/server/actions/mileage";

type Props = {
  type: "CREATE_MILEAGE_POST" | "EDIT_MILEAGE_POST";
  post?: MileageFormData;
};

const MileageForm = ({ type, post }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<FeaturedImageData[]>([]);
  const [isDeletingPhoto, setIsDeletingPhoto] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const regions = [
    "Greater Accra",
    "Ashanti",
    "Eastern",
    "Western",
    "Central",
    "Volta",
    "Northern",
    "Upper East",
    "Upper West",
    "Bono",
    "Bono East",
    "Ahafo",
    "Savannah",
    "North East",
  ];

  const form = useForm<z.infer<typeof createMileagePostSchema>>({
    resolver: zodResolver(createMileagePostSchema),
    defaultValues: {
      region: post?.region || "",
      placeName: post?.placeName || "",
      description: post?.description || "",
    },
  });

  // Handle multiple photo uploads
  const handleMultiplePhotoUpload = (uploadedFiles: any[]) => {
    try {
      const newPhotos: FeaturedImageData[] = uploadedFiles.map(
        (file, index) => ({
          id: file.id,
          url: file.url,
          thumbnailUrl: file.thumbnailUrl,
          originalName: file.originalName,
          fileSize: file.fileSize || 0,
          mimeType: file.mimeType || "image/jpeg",
          sortOrder: uploadedPhotos.length + index,
        })
      );

      setUploadedPhotos((prev) => [...prev, ...newPhotos]);
      toast.success(`${newPhotos.length} photo(s) uploaded successfully!`);
    } catch (error) {
      toast.error("Failed to upload photos. Please try again.");
    }
  };

  // Handle photo deletion
  const handlePhotoDelete = async (photoId: string) => {
    setIsDeletingPhoto(photoId);

    try {
      const response = await fetch(`/api/upload/${photoId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed!");
      }

      setUploadedPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      toast.success("Photo deleted successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Delete failed";
      toast.error(errorMessage);
    } finally {
      setIsDeletingPhoto(null);
    }
  };

  // Handle photo upload error
  const handlePhotoUploadError = (error: string) => {
    toast.error(error);
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newPhotos = [...uploadedPhotos];
    const draggedPhoto = newPhotos[draggedIndex];

    // Remove the dragged photo from its original position
    newPhotos.splice(draggedIndex, 1);

    // Insert it at the new position
    newPhotos.splice(dropIndex, 0, draggedPhoto);

    // Update sort order
    const updatedPhotos = newPhotos.map((photo, index) => ({
      ...photo,
      sortOrder: index,
    }));

    setUploadedPhotos(updatedPhotos);
    setDraggedIndex(null);
    setDragOverIndex(null);
    toast.success("Photo order updated!");
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Submit form
  const submitMileagePost = async (
    data: z.infer<typeof createMileagePostSchema>
  ) => {
    if (uploadedPhotos.length === 0) {
      toast.error("Please upload at least one photo.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submissionData = {
        ...data,
        photos: uploadedPhotos.map((photo) => photo.url),
      };

      const response = await createMileagePost(submissionData);

      if (!response.success) {
        throw new Error(response.error || "Failed to save mileage post");
      }

      toast.success(
        `Mileage post ${type === "CREATE_MILEAGE_POST" ? "created" : "updated"} successfully!`
      );
      form.reset();
      setUploadedPhotos([]);
      router.push("/mileage/gallery");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save mileage post";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {type === "CREATE_MILEAGE_POST" ? "Add New" : "Edit"} Mileage Post
        </h1>
        <p className="text-gray-600 mt-2">
          Create gallery post for a mileage visit.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitMileagePost)}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="placeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">
                    Place Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Platinum Blue Island, Cape Coast Castle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-gray-700">
                    Region
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-700">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    className="resize-y"
                    placeholder="Optional description about this place."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <FormLabel className="text-base font-medium text-gray-700">
              Photos ({uploadedPhotos.length}/30)
            </FormLabel>

            {/* Photo Upload */}
            <div className="space-y-2">
              <MultiFileUpload
                onUploadComplete={handleMultiplePhotoUpload}
                onUploadError={handlePhotoUploadError}
                folder="mileage"
                acceptedTypes={["image/*"]}
                maxFiles={30 - uploadedPhotos.length}
              />
              <p className="text-sm text-gray-500">
                Upload photos of your travels. You can upload up to 30 photos.
                Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>

            {/* Uploaded Photos Preview */}
            {uploadedPhotos.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop photos to reorder them. The first photo will be the cover image.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {uploadedPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`relative group cursor-move transition-all duration-200 ${draggedIndex === index ? "opacity-50 scale-95" : ""
                        } ${dragOverIndex === index ? "ring-2 ring-blue-500 ring-offset-2" : ""
                        }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      {/* Image container */}
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 border-2 border-transparent hover:border-gray-300 transition-colors relative">
                        <img
                          src={photo.url}
                          alt={photo.originalName || `Image ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            // Show error placeholder
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">Failed to load image</div>`;
                            }
                          }}
                        />

                        {/* Hover overlay for delete button */}
                        <div className="absolute inset-0 bg-stone-700 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePhotoDelete(photo.id);
                            }}
                            disabled={isDeletingPhoto === photo.id}
                          >
                            {isDeletingPhoto === photo.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Drag handle */}
                      <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-700 p-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Display order badge */}
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium z-10">
                        {index + 1}
                      </div>

                      {/* Cover image indicator */}
                      {index === 0 && (
                        <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                          Cover
                        </div>
                      )}

                      {/* Photo info */}
                      {photo.originalName && (
                        <div className="absolute bottom-2 left-2 right-2 z-10">
                          <div className="bg-black bg-opacity-75 text-white text-xs p-1 rounded truncate">
                            {photo.originalName}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button
              type="submit"
              disabled={isSubmitting || uploadedPhotos.length === 0}
              className="min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {type === "CREATE_MILEAGE_POST"
                    ? "Creating..."
                    : "Updating..."}
                </>
              ) : (
                `${type === "CREATE_MILEAGE_POST" ? "Create" : "Update"} Mileage Post`
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MileageForm;
