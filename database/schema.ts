import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "approved",
  "pending",
  "rejected",
]);

export const ROLE_ENUM = pgEnum("role", ["client", "admin", "super_admin"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").notNull().default("pending"),
  role: ROLE_ENUM("role").notNull().default("client"),
  lastActivity: timestamp("last_activity").notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// export const postsTable = pgTable("posts_table", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => usersTable.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

export const leadsTable = pgTable("leads_table", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  message: text("message").notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertLead = typeof leadsTable.$inferInsert;
export type SelectLead = typeof leadsTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
