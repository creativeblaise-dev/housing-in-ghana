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
  excerpt: z.string().max(255).optional(),
  status: z.string().min(1, "Article status is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  content: z.string().min(20, "Content should be at least 20 characters long"),
  featuredImageUrl: z.string().url("Image must be a valid URL").nonempty(),
  tags: z.array(z.string()).optional(),
});

export const insertFileUploadSchema = z.object({
  originalName: z.string().min(1),
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().int().min(1),
  url: z.string().url(),
  uploadedBy: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const uploadSchema = z.object({
  type: z.enum(["image", "document"]).optional().default("image"),
  folder: z.string().optional().default("uploads"),
});
