import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
  integer,
  varchar,
  uuid,
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
  status: STATUS_ENUM("status").notNull().default("pending"),
  role: ROLE_ENUM("role").notNull().default("contributor"),
  image: text("image"),
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
  id: text("id").primaryKey(),
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

export const article = pgTable("article", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: text("title").notNull(),
  content: jsonb("content").notNull().default("[]"),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  excerpt: text("excerpt"),
  category: text("category").notNull(),
  featuredImageUrl: text("featured_image_url"),
  status: ARTICLE_STATUS_ENUM("status").notNull().default("draft"), // <-- FIXED HERE
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
  author: text("author").notNull(),
  tags: jsonb("tags").default("[]"),
  magazineEditionAlias: varchar("magazine_edition_alias").references(
    () => magazineEditions.editionAlias,
    { onDelete: "set null" }
  ),
});

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

// Magazine Editions Table
export const magazineEditions = pgTable("magazine_editions", {
  id: uuid("id").primaryKey().defaultRandom(),
  editionNumber: integer("edition_number").notNull().unique(),
  editionAlias: varchar("edition_alias", { length: 25 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  editorialNote: text("editorial_note").notNull(),
  coverImage: text("cover_image").notNull(),
  backgroundImage: text("background_image").notNull(),
  releasedAt: varchar("released_at", { length: 100 }).notNull(),
  readOnlineButtonLink: text("read_online_button_link").notNull(),
});

// Junction table for many-to-many relationship between articles and magazine editions
export const articleMagazineEdition = pgTable("article_magazine_edition", {
  articleId: uuid("article_id")
    .notNull()
    .references(() => article.id, { onDelete: "cascade" }),
  magazineEditionAlias: varchar("magazine_edition_alias", { length: 25 })
    .notNull()
    .references(() => magazineEditions.editionAlias, { onDelete: "cascade" }),
});

export const mileagePosts = pgTable("mileage_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  region: varchar("region", { length: 255 }).notNull(),
  placeName: varchar("place_name", { length: 255 }).notNull(),
  description: text("description"),
  photos: jsonb("photos").notNull().default("[]"), // Array of photo objects
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
