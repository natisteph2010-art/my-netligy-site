import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  real,
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
  totalHoursTaught: real("total_hours_taught").notNull().default(0),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mentoringSessions = pgTable("mentoring_sessions", {
  id: serial().primaryKey(),
  mentorIdentityUserId: text("mentor_identity_user_id").notNull(),
  studentIdentityUserId: text("student_identity_user_id"),
  studentName: text("student_name").notNull(),
  studentContact: text("student_contact").notNull(),
  subject: text().notNull(),
  topicDescription: text("topic_description").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: text().notNull().default("PENDING"), // PENDING | UPCOMING | COMPLETED | DECLINED
  reminderSentAt: timestamp("reminder_sent_at"),
  actualDurationMinutes: integer("actual_duration_minutes"),
  topicsCovered: text("topics_covered"),
  evidenceLink: text("evidence_link"),
  evidenceFileName: text("evidence_file_name"),
  evidenceMimeType: text("evidence_mime_type"),
  evidenceData: text("evidence_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  approvedAt: timestamp("approved_at"),
  completedAt: timestamp("completed_at"),
  evidenceReviewedAt: timestamp("evidence_reviewed_at"),
  evidenceReviewedBy: text("evidence_reviewed_by"),
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

export const ambassadors = pgTable("ambassadors", {
  id: serial().primaryKey(),
  fullName: text("full_name").notNull(),
  title: text().notNull().default("Student Ambassador"),
  school: text(),
  country: text(),
  city: text(),
  graduationYear: text("graduation_year"),
  bio: text().notNull().default(""),
  achievements: text().notNull().default(""), // JSON array stored as text
  subjects: text().notNull().default(""), // JSON array stored as text
  languages: text().notNull().default(""), // JSON array stored as text
  photoUrl: text("photo_url"),
  contactEmail: text("contact_email"),
  instagram: text(),
  telegram: text(),
  whatsapp: text(),
  linkedin: text(),
  website: text(),
  featured: boolean().notNull().default(false),
  isPublic: boolean("is_public").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
