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
import { createArticle, updateArticle } from "@/server/actions/article";
import editFeaturedImage from "@/server/actions/featured-image";
import {
  SimpleEditor,
  SimpleEditorRef,
} from "@/components/tiptap-templates/simple/simple-editor";
import { JSONContent } from "@tiptap/react";

interface Props extends Partial<ArticleType> {
  type: "CREATE_ARTICLE" | "EDIT_ARTICLE";
}

type ArticleFormValues = z.infer<typeof articleSchema>;

const ArticleForm = ({ type, ...article }: Props) => {
  const router = useRouter();
  const editorRef = React.useRef<SimpleEditorRef>(null);

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || "",
      category: article?.category || "",
      slug: article?.slug || "",
      createdAt: article?.createdAt || new Date(),
      updatedAt: article?.updatedAt || new Date(),
      content: article?.content || [],
      featuredImageUrl: article?.featuredImageUrl || "",
      author: article?.author || "",
      status: article?.status || "draft",
      tags: article?.tags || [],
      excerpt: article?.excerpt || "",
      magazineEditionAlias: article?.magazineEditionAlias,
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
    if (!featuredImage?.id) {
      toast.error("No image ID found for deletion.");
      return;
    }

    setIsDeletingImage(true);

    try {
      if (type === "EDIT_ARTICLE") {
        // For edit mode, use the server action to remove from article, database, and DO Spaces
        console.log("🗑️ Removing featured image from article:", article?.id);

        const result = await editFeaturedImage({ articleId: article?.id });

        if (!result?.success) {
          throw new Error(result?.message || "Failed to remove featured image");
        }

        console.log("✅ Featured image removed from article:", result);
        toast.success("Featured image has been removed successfully.");
      } else {
        // For create mode, the ImagePreviewWithDelete component handles the actual deletion
        // We just need to clear the UI state here
        console.log("🗑️ CREATE mode: ImagePreviewWithDelete component will handle file deletion");
        console.log("🗑️ Clearing UI state for featured image:", {
          id: featuredImage.id,
          url: featuredImage.url,
          originalName: featuredImage.originalName
        });

        // Don't make API call here - let ImagePreviewWithDelete handle it
        // Just clear the UI state
      }

      // Clear featured image state and form value for successful operations
      setFeaturedImage(null);
      form.setValue("featuredImageUrl", "");

    } catch (error) {
      console.error("❌ Featured image delete failed:", error);

      // For EDIT mode, show error toast
      if (type === "EDIT_ARTICLE") {
        const errorMessage =
          error instanceof Error ? error.message : "Delete failed";
        toast.error(errorMessage);
      }
      // For CREATE mode, don't show error toast - let ImagePreviewWithDelete handle it
    } finally {
      setIsDeletingImage(false);
    }
  };



  const handleImageUploadError = (error: string) => {
    toast.error(error);
  };

  // Handle editor content changes
  const handleContentChange = (content: JSONContent[]) => {
    console.log("Editor content changed:", content);
    console.log("Content length:", content.length);
    form.setValue("content", content, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const submitArticle = async (data: z.infer<typeof articleSchema>) => {
    try {
      // Get the latest content directly from the editor before submitting
      const latestContent = editorRef.current?.getContent() || [];
      console.log("Latest content from editor:", latestContent);

      // Update the data with the latest editor content
      const submitData = {
        ...data,
        content: latestContent,
      };

      console.log("Submit data with editor content:", submitData);

      const now = new Date();

      if (type === "EDIT_ARTICLE") {
        const result = await updateArticle(article.slug ?? "", {
          ...submitData,
          magazineEditionAlias: submitData.magazineEditionAlias,
          createdAt: submitData.createdAt ?? new Date(),
          updatedAt: submitData.updatedAt ?? new Date(),
        });

        if (result.success) {
          console.log("Updating article:", article?.slug, result.data);
          toast.success("Article updated successfully!");
          form.reset();
          router.push(`/admin/articles`);
        } else {
          toast.error("Failed to update article.");
        }
      } else {
        const result = await createArticle({
          ...submitData,
          excerpt: submitData.excerpt || "",
          magazineEditionAlias:
            submitData.magazineEditionAlias || "Not Featured",
          status: submitData.status,
          createdAt: submitData.createdAt ?? now,
          updatedAt: submitData.updatedAt ?? now,
        });

        if (result.success) {
          toast.success("Article created successfully!");
          form.reset();
          router.push(`/admin/articles`);
        } else {
          toast.error(result.message || "Failed to create article.");
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error("Message: " + errorMessage);
    }
  };

  console.log("Form validation errors:", form.formState.errors);
  console.log("Form values:", form.getValues());

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
                type="button"
                className="bg-[#1c1c1c] w-50 mt-4 cursor-pointer"
                onClick={() => {
                  const title = form.getValues("title");
                  const generatedSlug = generateSlug(title);
                  form.setValue("slug", generatedSlug);
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
          name={"excerpt"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Excerpt
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="max-h-[100px] min-h-[100px] resize-y"
                  placeholder="Type your excerpt..."
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
              <SimpleEditor
                ref={editorRef}
                content={field.value as JSONContent[]}
                onChange={handleContentChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"magazineEditionAlias"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-stone-700">
                Featured Magazine Edition
              </FormLabel>
              <FormControl>
                <Select
                  value={form.watch("magazineEditionAlias")}
                  onValueChange={(value) =>
                    form.setValue("magazineEditionAlias", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a magazine edition" />
                  </SelectTrigger>
                  <SelectContent>
                    {magazineEditions.map((edition) => (
                      <SelectItem
                        key={edition.editionAlias}
                        value={edition.editionAlias}
                      >
                        {edition.editionAlias}
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
          {type === "EDIT_ARTICLE" ? "Update Article" : "Create Article"}
        </Button>
      </form>
    </Form>
  );
};

export default ArticleForm;
