import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  // businessCerificate: z.string().nonempty("Business Certifcate is required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const articleSchema = z.object({
  title: z
    .string()
    .min(2, "Title should be at least 2 characters long")
    .max(100, "Title should be at most 100 characters long"),
  author: z
    .string()
    .trim()
    .min(1, "Author is required")
    .max(100, "Author should be at most 100 characters long"),
  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(50, "Category should be at most 50 characters long"),
  slug: z.string().trim().min(2, "Slug should be at least 2 characters long"),
  articleStatus: z.enum(["draft", "published", "archived"]),
  excerpt: z.string().max(255).optional(),
  published: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  content: z.string().min(20, "Content should be at least 20 characters long"),
  featuredImageUrl: z.string().url("Image must be a valid URL").nonempty(),
  likes: z.number().min(0).optional(),
  views: z.number().min(0).optional(),
  commentsCount: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
});

export const articleTag = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50),
});

export const articleCategory = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50),
  description: z.string().max(255).optional(),
});

export const commentSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
  userId: z.string().min(1, "User ID is required"),
  content: z
    .string()
    .min(1, "Comment content cannot be empty")
    .max(1000, "Comment content should be at most 1000 characters long"),
});
