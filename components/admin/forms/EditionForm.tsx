"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FeaturedImageData, MagazineEdition } from "@/types";
import { magazineEditionSchema } from "@/lib/validations";
import { toast } from "sonner";
import { ImagePreviewWithDelete } from "@/components/ui/image-preview-with-delete";
import { ImagePreview } from "@/components/ui/image-preview";
import DatePicker from "@/components/DatePicker";

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
import { createEdition } from "@/server/actions/edition";
import { Loader2 } from "lucide-react";
import FileUpload from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  type: "CREATE_EDITION" | "EDIT_EDITION";
  edition?: Partial<MagazineEdition>;
}

const EditionForm = ({ edition }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof magazineEditionSchema>>({
    resolver: zodResolver(magazineEditionSchema),
    defaultValues: {
      title: edition?.title || "",
      editionNumber: edition?.editionNumber || 1,
      summary: edition?.summary || "",
      backgroundImage: edition?.backgroundImage || "",
      coverImage: edition?.coverImage || "",
      editorialNote: edition?.editorialNote || "",
      releasedAt: edition?.releasedAt || new Date().toISOString().split("T")[0],
      readOnlineButtonLink: edition?.readOnlineButtonLink || "",
      editionAlias: edition?.editionAlias,
    },
  });

  const [isDeletingImage, setIsDeletingImage] = useState(false);
  const [isDeletingBgImage, setIsDeletingBgImage] = useState(false);

  const [magazineEditionAlias, setEditionAlias] = useState(
    "Select Edition Alias"
  );

  const [coverImage, setCoverImage] = useState<FeaturedImageData | null>(
    edition?.coverImage
      ? {
          id: "",
          url: edition.coverImage,
          originalName: "",
        }
      : null
  );

  const [backgroundImage, setBackgroundImage] =
    useState<FeaturedImageData | null>(
      edition?.backgroundImage
        ? {
            id: "",
            url: edition.backgroundImage,
            originalName: "",
          }
        : null
    );

  const handleImageUpload = (uploadedFile: any) => {
    try {
      const imageData: FeaturedImageData = {
        id: uploadedFile.id,
        url: uploadedFile.url,
        originalName: uploadedFile.originalName,
      };
      setCoverImage(imageData);
      form.setValue("coverImage", uploadedFile.url);
      toast.success("Cover image has been uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload cover image. Please try again.");
    }
  };

  const handleImageUploadForBackground = (uploadedFile: any) => {
    try {
      const imageData: FeaturedImageData = {
        id: uploadedFile.id,
        url: uploadedFile.url,
        originalName: uploadedFile.originalName,
      };
      setBackgroundImage(imageData);
      form.setValue("backgroundImage", uploadedFile.url);
      toast.success("Background image has been uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload background image. Please try again.");
    }
  };

  const handleImageDelete = async () => {
    if (!coverImage) return;

    setIsDeletingImage(true);

    try {
      console.log("🗑️ Deleting cover image:", coverImage);

      const response = await fetch(`/api/upload/${coverImage.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed!");
      }

      const result = await response.json();
      console.log("✅ Cover image deleted:", result);

      setCoverImage(null);
      form.setValue("coverImage", "");

      toast.success("Cover image has been removed successfully.");
    } catch (error) {
      console.error("❌ Cover image delete failed:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Delete failed";
      toast.error(errorMessage);
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleBackgroundImageDelete = async () => {
    if (!backgroundImage) return;

    setIsDeletingBgImage(true);

    try {
      console.log("🗑️ Deleting background image:", backgroundImage);

      const response = await fetch(`/api/upload/${backgroundImage.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed!");
      }

      const result = await response.json();
      console.log("✅ Background image deleted:", result);

      setBackgroundImage(null);
      form.setValue("backgroundImage", "");

      toast.success("Background image has been removed successfully.");
    } catch (error) {
      console.error("❌ Background image delete failed:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Delete failed";
      toast.error(errorMessage);
    } finally {
      setIsDeletingBgImage(false);
    }
  };

  // const handleImageRemove = () => {
  //   setBackgroundImage(null);
  //   form.setValue("backgroundImage", "");
  // };

  const handleImageUploadError = (error: string) => {
    toast.error(error);
  };

  const submitEdition = async (data: z.infer<typeof magazineEditionSchema>) => {
    try {
      const result = await createEdition({
        ...data,
        coverImage: coverImage?.url || "",
        editionNumber: data.editionNumber,
        backgroundImage: backgroundImage?.url || "",
        readOnlineButtonLink: data.readOnlineButtonLink || "",
        summary: data.summary || "",
        editorialNote: data.editorialNote || "",
        releasedAt: data.releasedAt || new Date().toISOString(),
        editionAlias: data.editionAlias || "",
      });

      if (result?.success) {
        toast.success("Edition created successfully!");
        form.reset();
        setCoverImage(null);
        setBackgroundImage(null);
        console.log("🚀 Edition created:", result.data);
      } else {
        console.error("❌ Edition creation failed:", result);
        toast.error(result?.error || "Failed to create edition.");
      }
    } catch (error) {
      console.error("❌ Edition creation failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create edition.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitEdition)} className="space-y-8">
          {/* Edition Number */}
          <FormField
            control={form.control}
            name="editionNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Edition Number
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter edition number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(
                        (e.target as HTMLInputElement).valueAsNumber
                      );
                      setEditionAlias(
                        `Edition 0${(e.target as HTMLInputElement).valueAsNumber}`
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Released Year */}
          <FormField
            control={form.control}
            name="releasedAt"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Year Published
                </FormLabel>
                <FormControl>
                  {/* <Input placeholder="2024" {...field} /> */}
                  <DatePicker
                    selectedDate={field.value}
                    onDateChange={(date: any) => field.onChange(date)}
                    maxDate={new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Cover Image
                </FormLabel>
                <FormControl>
                  {coverImage ? (
                    <div className="space-y-4">
                      <ImagePreviewWithDelete
                        src={`${coverImage.url}`}
                        alt="Cover image"
                        fileId={coverImage.id}
                        onRemove={handleImageDelete}
                        showDeleteConfirm={true}
                        className={`w-full max-w-md ${isDeletingImage ? "opacity-50 pointer-events-none" : ""}`}
                      />

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{coverImage.originalName}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              navigator.clipboard.writeText(coverImage.url)
                            }
                            disabled={isDeletingImage}
                          >
                            Copy URL
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              window.open(coverImage.url, "_blank")
                            }
                            disabled={isDeletingImage}
                          >
                            View Full Size
                          </Button>
                        </div>
                      </div>

                      {isDeletingImage && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Removing cover image...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileUpload
                        onUploadComplete={handleImageUpload}
                        onUploadError={handleImageUploadError}
                        uploadType="image"
                        folder="editions"
                        acceptedTypes={["image/*"]}
                      />
                      <p className="text-sm text-gray-500">
                        Upload a cover image for this edition
                      </p>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Background Image */}
          <FormField
            control={form.control}
            name="backgroundImage"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Background Image (Optional)
                </FormLabel>
                <FormControl>
                  {backgroundImage ? (
                    <div className="space-y-4">
                      <ImagePreview
                        src={`${backgroundImage.url}`}
                        fileId={backgroundImage.id}
                        alt="Background image"
                        onRemove={handleBackgroundImageDelete}
                        className={`w-full max-w-md ${isDeletingBgImage ? "opacity-50 pointer-events-none" : ""}`}
                      />

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{backgroundImage.originalName}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              navigator.clipboard.writeText(backgroundImage.url)
                            }
                            disabled={isDeletingBgImage}
                          >
                            Copy URL
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              window.open(backgroundImage.url, "_blank")
                            }
                            disabled={isDeletingBgImage}
                          >
                            View Full Size
                          </Button>
                        </div>
                      </div>

                      {isDeletingBgImage && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Removing background image...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileUpload
                        onUploadComplete={handleImageUploadForBackground}
                        onUploadError={handleImageUploadError}
                        uploadType="image"
                        folder="editions"
                        acceptedTypes={["image/*"]}
                      />
                      <p className="text-sm text-gray-500">
                        Upload a background image (optional)
                      </p>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Summary */}
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="max-h-[200px] min-h-[100px] resize-y"
                    placeholder="Type your summary..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Editorial Note */}
          <FormField
            control={form.control}
            name="editorialNote"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Editorial Note
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="max-h-[400px] min-h-[200px] resize-y"
                    placeholder="Type editorial note..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="readOnlineButtonLink"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Edition PDF Url
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter edition PDF URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="editionAlias"
            render={({ field }) => (
              <FormItem className=" flex flex-col gap-1 ">
                <FormLabel className="text-base font-normal text-stone-700">
                  Featured Magazine Edition
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select edition alias" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        <SelectItem
                          key={magazineEditionAlias}
                          value={magazineEditionAlias}
                        >
                          {magazineEditionAlias}
                        </SelectItem>
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            className="w-1/2 bg-[#1c1c1c] ml-auto cursor-pointer"
            type="submit"
          >
            Submit Edition
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditionForm;
