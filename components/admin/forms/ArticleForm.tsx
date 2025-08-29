"use client";

import React from "react";
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
import { Article } from "@/types";
import { articleSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { fi } from "zod/v4/locales";

interface Props extends Partial<Article> {
  type: "CREATE_ARTICLE" | "EDIT_ARTICLE";
}

const ArticleForm = ({ type, ...article }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      slug: "",
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      content: "",
      articleStatus: "draft",
      featuredImageUrl: "",
      likes: 4,
      views: 7,
      commentsCount: 100,
      tags: [
        "Real Estate",
        "Housing",
        "Ghana",
        "Land Use",
        "Green Building",
        "Eco-Friendly",
        "Urban Planning",
        "Affordable Housing",
        "Climate Change   Mitigation",
        "Energy Efficiency",
        "Renewable Energy",
        "Sustainable Development",
        "Environmental Impact",
        "Community Development",
        "Smart Growth",
        "Resilient Cities",
        "Sustainable Architecture",
        "Green Infrastructure",
        "Sustainable Living",
      ],
    },
  });

  const submitArticle = async (data: z.infer<typeof articleSchema>) => {
    console.log("Article Data: ", data);
  };

  return (
    <div className="flex flex-col gap-4">
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
                  <Input
                    placeholder="Enter article title"
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
            name={"slug"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Slug
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter article slug or leave a auto-generated"
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
                  <Input placeholder="Add a category " required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"tags"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Tags
                </FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[480px]">
                      <SelectValue placeholder="Select tags for your article" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.value?.map((tag, index) => (
                        <SelectItem value={tag} key={index}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name={"imageUrl"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Cover Image
                </FormLabel>
                <FormControl>{''}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
            name={"articleStatus"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base font-normal text-stone-700">
                  Status
                </FormLabel>
                <FormControl>
                  <Select
                    value={form.watch("articleStatus")}
                    onValueChange={(value) =>
                      form.setValue("articleStatus", value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
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

          <Button className="w-1/2 bg-[#1c1c1c] ml-auto" type="submit">
            Submit Article
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ArticleForm;
