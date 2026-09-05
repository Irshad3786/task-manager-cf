import { sqliteTable,text,integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at").notNull(),
});


export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", {
    enum: ["todo", "in-progress", "done"],
  })
    .notNull()
    .default("todo"),
  dueDate: integer("due_date"),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});