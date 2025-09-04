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
  magazineEditionId: z.string().or(z.literal("not-featured")),
  featuredImageUrl: z.string().url("Image must be a valid URL").nonempty(),
  tags: z.array(z.string()).min(1).optional(),
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

export const magazineEditionSchema = z.object({
  editionNumber: z
    .number()
    .int()
    .positive("Edition number must be a positive integer"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  summary: z.string().min(1, "Summary is required"),
  editorialNote: z.string().min(1, "Editorial note is required"),
  coverImage: z.string().min(1, "Cover image is required"),
  backgroundImage: z.string().min(1, "Background image is required"),
  releasedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  readOnlineButtonLink: z
    .string()
    .url("Read online button link must be a valid URL"),
});
