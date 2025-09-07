"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useForm } from "react-hook-form";

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
import { ArticleType } from "@/types";
import { articleSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/file-upload";
import { toast } from "sonner";
import { ImagePreviewWithDelete } from "@/components/ui/image-preview-with-delete";
import { FeaturedImageData } from "@/types";
import { MagazineEdition } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { createArticle } from "@/lib/actions/admin/article";

interface Props extends Partial<ArticleType> {
  type: "CREATE_ARTICLE" | "EDIT_ARTICLE";
}

const ArticleForm = ({ type, ...article }: Props) => {
  const router = useRouter();

  type ArticleFormValues = z.infer<typeof articleSchema>;

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      content: "",
      featuredImageUrl: "",
      author: "",
      status: "draft",
      tags: [],
      excerpt: "",
    },
  });

  const [featuredImage, setFeaturedImage] = useState<FeaturedImageData | null>(
    article.initialFeaturedImage || null
  );

  const [magazineEditions, setMagazineEditions] = useState<MagazineEdition[]>(
    []
  );

  // Fetch magazine editions for the select field
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const res = await fetch("/api/magazine");
        const data = await res.json();
        setMagazineEditions(data);
      } catch (error) {
        toast.error("Failed to load magazine editions.");
      }
    };
    fetchEditions();
  }, []);

  const [isDeletingImage, setIsDeletingImage] = useState(false);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleImageUpload = (uploadedFile: any) => {
    try {
      const imageData: FeaturedImageData = {
        id: uploadedFile.id,
        url: uploadedFile.url,
        originalName: uploadedFile.originalName,
      };
      setFeaturedImage(imageData);
      form.setValue("featuredImageUrl", uploadedFile.url);
      toast.success("Featured image has been uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload featured image. Please try again.");
    }
  };

  const handleImageDelete = async () => {
    if (!featuredImage) return;

    setIsDeletingImage(true);

    try {
      console.log("🗑️ Deleting featured image:", featuredImage);

      const response = await fetch(`/api/upload/${featuredImage.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Delete failed!");
      }

      const result = await response.json();
      console.log("✅ Featured image deleted:", result);

      // Clear featured image state
      setFeaturedImage(null);
      form.setValue("featuredImageUrl", "");

      toast.success("Featured image has been removed successfully.");
    } catch (error) {
      console.error("❌ Featured image delete failed:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Delete failed";
      toast.error(errorMessage);
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleImageUploadError = (error: string) => {
    toast.error(error);
  };

  const submitArticle = async (data: z.infer<typeof articleSchema>) => {
    const now = new Date();
    const result = await createArticle({
      ...data,
      magazineEditionNumber: data.magazineEditionNumber || null,
      status: data.status,
      createdAt: data.createdAt ?? now,
      updatedAt: data.updatedAt ?? now,
    });

    if (result.success) {
      toast.success("Article created successfully!");
      form.reset();
      router.push(`/admin/articles`);
    } else {
      toast.error(result.message || "Failed to create article.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitArticle)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Title
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"slug"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Slug
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="slug is auto-generated"
                  required
                  {...field}
                />
              </FormControl>

              <Button
                className=" bg-[#1c1c1c] w-50 mt-4 cursor-pointer"
                onClick={() => {
                  form.setValue("slug", generateSlug(field.value));
                }}
              >
                Generate article slug
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Author name prefilled from session"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"category"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Category
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[480px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="Land Use">Land Use</SelectItem>
                    <SelectItem value="Affordable Housing">
                      Affordable Housing
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"tags"}
          render={({ field }) => {
            const tagOptions: string[] = [
              "Real Estate",
              "Housing",
              "Ghana",
              "Land Use",
              "Affordable Housing",
            ];
            return (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Tags
                </FormLabel>
                <FormControl>
                  <div className="w-[480px] border rounded p-2 flex flex-wrap gap-2 min-h-[42px]">
                    {tagOptions.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={`px-2 py-1 rounded border text-sm ${field.value?.includes(tag) ? "bg-stone-800 text-white" : "bg-white text-stone-800"}`}
                        onClick={() => {
                          if (field.value?.includes(tag)) {
                            field.onChange(
                              field.value.filter((t: string) => t !== tag)
                            );
                          } else {
                            field.onChange([...(field.value || []), tag]);
                          }
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name={"featuredImageUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Featured image
              </FormLabel>
              <FormControl>
                {featuredImage ? (
                  <div className="space-y-4">
                    <ImagePreviewWithDelete
                      src={`${featuredImage.url}`}
                      alt="Featured image"
                      fileId={featuredImage.id}
                      onRemove={handleImageDelete}
                      showDeleteConfirm={true}
                      className={`w-full max-w-md ${isDeletingImage ? "opacity-50 pointer-events-none" : ""}`}
                    />

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>{featuredImage.originalName}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(featuredImage.url)
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
                            window.open(featuredImage.url, "_blank")
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
                        <span>Removing featured image...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FileUpload
                      onUploadComplete={handleImageUpload}
                      onUploadError={handleImageUploadError}
                      uploadType="image"
                      folder="articles"
                      acceptedTypes={["image/*"]}
                    />

                    <p className="text-sm text-gray-500">
                      Upload a featured image for this article. Recommended
                      size: 1200x630px
                    </p>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="max-h-[400px] min-h-[200px] resize-y"
                  placeholder="Type your article content..."
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"magazineEditionNumber"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Featured Magazine Edition
              </FormLabel>
              <FormControl>
                <Select
                  value={
                    form.watch("magazineEditionNumber")?.toString() ??
                    "Not Featured"
                  }
                  onValueChange={(value) =>
                    form.setValue("magazineEditionNumber", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a magazine edition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Featured">Not Featured</SelectItem>
                    {magazineEditions.map((edition) => (
                      <SelectItem
                        key={edition.editionNumber}
                        value={edition.editionNumber.toString()}
                      >
                        {edition.editionNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"status"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Status
              </FormLabel>
              <FormControl>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value) =>
                    form.setValue("status", value as any)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-1/2 bg-[#1c1c1c] ml-auto cursor-pointer"
          type="submit"
        >
          Submit Article
        </Button>
      </form>
    </Form>
  );
};

export default ArticleForm;
