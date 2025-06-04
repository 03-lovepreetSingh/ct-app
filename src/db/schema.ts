import {
  pgTable,
  json,
  varchar,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const messages = pgTable("messages", {
  id: varchar("id", { length: 256 }).primaryKey(),
  senderId: varchar("senderId").references(() => users.id),
  receiverId: varchar("receiverId").references(() => users.id),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const conversations = pgTable("conversations", {
  id: varchar("id", { length: 256 }).primaryKey(),
  participants: varchar("participants").references(() => users.id),
  messages: varchar("messages").references(() => messages.id),
});
export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  fullName: text("full_name"),
  image_url: varchar("image_url", { length: 256 }),
  metaMask: varchar("MetaMask Wallet Address", { length: 256 }),
  email: varchar("email", { length: 256 }),
  Location: varchar("Location", { length: 256 }),
  Bio: text("Bio"),
  Telegram: varchar("Telegram", { length: 256 }),
  Twitter: varchar("Twitter", { length: 256 }),
  Linkedin: varchar("Linkedin", { length: 256 }),
});

export const projects = pgTable("projects", {
  projectName: varchar("id", { length: 256 }).primaryKey(),
  aiDescription: text("AI Description"),
  projectOwner: varchar("ProjectOwner", { length: 256 }),
  shortdes: text("Short Description"),
  longdis: text("Long Description"),
  image_url: varchar("image_url", { length: 256 }),
  project_repository: varchar("Repository", { length: 256 }),
  project_issues: varchar("issues", { length: 256 }),
  contributors: json("maintainers"),
  rewardAmount: varchar("rewardAmount", { length: 256 }),
  Difficulty: varchar("Difficulty", { length: 256 }),
  priority: varchar("priority", { length: 256 }),
  languages: json("languages"),
  stars: varchar("stars"),
  forks: varchar("forks"),
});

export const assignIssues = pgTable("assignIssues", {
  projectName: varchar("projectName", { length: 256 }),
  Contributor_id: varchar("Contributor", { length: 256 }),
  issue: varchar("issue", { length: 256 }),
  image_url: varchar("image_url", { length: 256 }),
  name: varchar("name", { length: 256 }),
  description: text("description"),
});

export const assignedIssues = pgTable("assignedIssues", {
  projectName: varchar("projectName", { length: 256 }),
  projectOwner: varchar("projectOwner", { length: 256 }),
  Contributor_id: varchar("Contributor", { length: 256 }),
  issue: varchar("issue", { length: 256 }),
  image_url: varchar("image_url", { length: 256 }),
  name: varchar("name", { length: 256 }),
  description: text("description"),
});

export const pendingReview = pgTable("pendingReview", {
  projectName: varchar("projectName", { length: 256 }),
  Contributor_id: varchar("Contributor", { length: 256 }),
  issue: varchar("issue", { length: 256 }),
  image_url: varchar("image_url", { length: 256 }),
  name: varchar("name", { length: 256 }),
  description: text("description"),
});

export const completedIssues = pgTable("completedIssues", {
  projectName: varchar("projectName", { length: 256 }),
  Contributor_id: varchar("Contributor", { length: 256 }),
  issue: varchar("issue", { length: 256 }),
  image_url: varchar("image_url", { length: 256 }),
  name: varchar("name", { length: 256 }),
  description: text("description"),
});

export const Rewards = pgTable("rewards", {
  projectName: varchar("projectName", { length: 256 }),
  Contributor_id: varchar("Contributor", { length: 256 }),
  issue: varchar("issue", { length: 256 }),
  value: varchar("value", { length: 256 }),
  date: varchar("date", { length: 256 }),
});

export const contributorRequests = pgTable("contributorRequests", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  projectName: varchar("projectName", { length: 256 }),
  Contributor_id: varchar("Contributor", { length: 256 }),
  contributor_email: varchar("contributor_email", { length: 256 }),
  requestDate: varchar("requestDate", { length: 256 }),
  projectOwner: varchar("projectOwner", { length: 256 }),
  skills: json("skills"),
  issue: varchar("issue", { length: 256 }),
  image_url: varchar("image_url", { length: 256 }),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  status: varchar("status", { length: 256 }),
});

export const issues = pgTable("issues", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  issue_name: varchar("issue_name", { length: 256 }),
  issue_description: text("issue_description"),
  issue_date: varchar("issue_date", { length: 256 }),
  Difficulty: varchar("Difficulty", { length: 256 }),
  priority: varchar("Priority", { length: 256 }),
  project_repository: varchar("Repository", { length: 256 }),
  project_issues: varchar("issues", { length: 256 }),
  rewardAmount: varchar("rewardAmount", { length: 256 }),
});

export const project = pgTable("project", {
  projectName: varchar("id", { length: 256 }).primaryKey(),
  aiDescription: text("AI Description"),
  projectOwner: varchar("ProjectOwner", { length: 256 }),
  shortdes: text("Short Description"),
  longdis: text("Long Description"),
  image_url: varchar("image_url", { length: 256 }),
  project_repository: varchar("Repository", { length: 256 }),
  contributors: json("maintainers"),
  languages: json("languages"),
  stars: varchar("stars"),
  forks: varchar("forks"),
  likes: integer("likes"),
  owner: json("owner"),
  language: json("language"),
  comits: json("comits"),
});
