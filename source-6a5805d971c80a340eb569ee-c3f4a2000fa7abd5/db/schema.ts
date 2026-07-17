import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const mentorApplications = pgTable("mentor_applications", {
  id: serial().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  school: text().notNull(),
  subjects: text().notNull(), // JSON array stored as text
  statement: text().notNull(),
  availability: text().notNull(),
  status: text().notNull().default("pending"), // "pending" | "approved" | "rejected"
  identityUserId: text("identity_user_id"), // set after Identity user is created
  createdAt: timestamp("created_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
});

export const mentorProfiles = pgTable("mentor_profiles", {
  id: serial().primaryKey(),
  applicationId: integer("application_id")
    .notNull()
    .references(() => mentorApplications.id),
  identityUserId: text("identity_user_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text().notNull(),
  bio: text().notNull().default(""),
  igcseGrades: text("igcse_grades").notNull().default(""), // JSON stored as text
  subjects: text().notNull().default(""), // JSON array stored as text
  reason: text().notNull().default(""),
  availability: text().notNull().default(""),
  profilePicUrl: text("profile_pic_url"),
  instagram: text(),
  telegram: text(),
  whatsapp: text(),
  contactEmail: text("contact_email"),
  linkedin: text(),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: serial().primaryKey(),
  title: text().notNull(),
  body: text().notNull(),
  publishDate: timestamp("publish_date").defaultNow(),
  expiresAt: timestamp("expires_at"), // optional
  pinned: boolean().notNull().default(false),
  archived: boolean().notNull().default(false),
  authorEmail: text("author_email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userAccounts = pgTable("user_accounts", {
  identityUserId: text("identity_user_id").primaryKey(),
  email: text().notNull(),
  role: text().notNull().default("student"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const students = pgTable("students", {
  id: serial().primaryKey(),
  identityUserId: text("identity_user_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  age: integer().notNull(),
  gradeLevel: text("grade_level").notNull(),
  email: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
