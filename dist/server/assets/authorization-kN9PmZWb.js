import { getUser } from "@netlify/identity";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, timestamp, boolean, real, text, integer, serial } from "drizzle-orm/pg-core";
const mentorApplications = pgTable("mentor_applications", {
  id: serial().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  school: text().notNull(),
  subjects: text().notNull(),
  // JSON array stored as text
  statement: text().notNull(),
  availability: text().notNull(),
  status: text().notNull().default("pending"),
  // "pending" | "approved" | "rejected"
  identityUserId: text("identity_user_id"),
  // set after Identity user is created
  createdAt: timestamp("created_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at")
});
const mentorProfiles = pgTable("mentor_profiles", {
  id: serial().primaryKey(),
  applicationId: integer("application_id").notNull().references(() => mentorApplications.id),
  identityUserId: text("identity_user_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text().notNull(),
  bio: text().notNull().default(""),
  igcseGrades: text("igcse_grades").notNull().default(""),
  // JSON stored as text
  subjects: text().notNull().default(""),
  // JSON array stored as text
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
  updatedAt: timestamp("updated_at").defaultNow()
});
const mentoringSessions = pgTable("mentoring_sessions", {
  id: serial().primaryKey(),
  mentorIdentityUserId: text("mentor_identity_user_id").notNull(),
  studentName: text("student_name").notNull(),
  studentContact: text("student_contact").notNull(),
  subject: text().notNull(),
  topicDescription: text("topic_description").notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  status: text().notNull().default("PENDING"),
  // PENDING | UPCOMING | COMPLETED | DECLINED
  reminderSentAt: timestamp("reminder_sent_at"),
  actualDurationMinutes: integer("actual_duration_minutes"),
  topicsCovered: text("topics_covered"),
  evidenceLink: text("evidence_link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  approvedAt: timestamp("approved_at"),
  completedAt: timestamp("completed_at")
});
const announcements = pgTable("announcements", {
  id: serial().primaryKey(),
  title: text().notNull(),
  body: text().notNull(),
  publishDate: timestamp("publish_date").defaultNow(),
  expiresAt: timestamp("expires_at"),
  // optional
  pinned: boolean().notNull().default(false),
  archived: boolean().notNull().default(false),
  authorEmail: text("author_email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const userAccounts = pgTable("user_accounts", {
  identityUserId: text("identity_user_id").primaryKey(),
  email: text().notNull(),
  role: text().notNull().default("student"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const students = pgTable("students", {
  id: serial().primaryKey(),
  identityUserId: text("identity_user_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  age: integer().notNull(),
  gradeLevel: text("grade_level").notNull(),
  email: text().notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  announcements,
  mentorApplications,
  mentorProfiles,
  mentoringSessions,
  students,
  userAccounts
}, Symbol.toStringTag, { value: "Module" }));
let _db = null;
function getDb() {
  if (!_db) {
    const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("Database connection string (SUPABASE_DB_URL or DATABASE_URL) is not defined.");
    }
    const client = postgres(connectionString, { prepare: false });
    _db = drizzle(client, { schema });
  }
  return _db;
}
const db = new Proxy({}, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  }
});
const rolePriority = ["admin", "mentor", "student"];
function getIdentityRole(user) {
  const assigned = /* @__PURE__ */ new Set([user.role, ...user.roles ?? []]);
  return rolePriority.find((role) => assigned.has(role)) ?? "student";
}
async function syncUserAccount(user, role) {
  if (!user.email) return;
  await db.insert(userAccounts).values({ identityUserId: user.id, email: user.email, role }).onConflictDoUpdate({
    target: userAccounts.identityUserId,
    set: { email: user.email, role, updatedAt: /* @__PURE__ */ new Date() }
  });
}
async function getCurrentUserWithRole() {
  const user = await getUser();
  if (!user) return null;
  const role = getIdentityRole(user);
  try {
    await syncUserAccount(user, role);
  } catch (err) {
    console.error("syncUserAccount failed (continuing without persisting):", err);
  }
  return { user, role };
}
async function getAdminUser() {
  const account = await getCurrentUserWithRole();
  return account?.role === "admin" ? account.user : null;
}
export {
  announcements as a,
  mentoringSessions as b,
  mentorApplications as c,
  db as d,
  getCurrentUserWithRole as e,
  getAdminUser as g,
  mentorProfiles as m,
  students as s,
  userAccounts as u
};
