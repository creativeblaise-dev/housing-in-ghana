import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
  pgEnum,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "approved",
  "pending",
  "rejected",
]);

export const ARTICLE_STATUS_ENUM = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const ROLE_ENUM = pgEnum("role", [
  "contributor",
  "admin",
  "super_admin",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  status: STATUS_ENUM("status").notNull().default("pending"),
  role: ROLE_ENUM("role").notNull().default("contributor"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Category table
export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
});

// Tag table
export const tag = pgTable("tag", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
});

// Article table with stats
export const article = pgTable("article", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  excerpt: text("excerpt"),
  featuredImageUrl: text("featured_image_url"),
  status: ARTICLE_STATUS_ENUM("article_status").notNull().default("draft"),
  published: boolean("published").$defaultFn(() => false),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => category.id),
  tags: jsonb("tags").default("[]"), // Array of tags as JSONB
  views: integer("views").$defaultFn(() => 0),
  likes: integer("likes").$defaultFn(() => 0),
  commentsCount: integer("comments_count").$defaultFn(() => 0),
});

// Comments table
export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  articleId: text("article_id")
    .references(() => article.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

// File uploads table (for tracking all uploaded files)
export const fileUploads = pgTable("file_uploads", {
  id: uuid("id").defaultRandom().primaryKey(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  size: integer("size").notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  uploadedBy: varchar("uploaded_by", { length: 255 }),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export type InsertUser = typeof user.$inferInsert;
// export type SelectUser = typeof user.$inferSelect;

// export type InsertAccount = typeof account.$inferInsert;
// export type SelectAccount = typeof account.$inferSelect;

// export type InsertVerification = typeof verification.$inferInsert;
// export type SelectVerification = typeof verification.$inferSelect;

// export type InsertArticle = typeof article.$inferInsert;
// export type SelectArticle = typeof article.$inferSelect;
