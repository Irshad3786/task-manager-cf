import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { and, eq } from "drizzle-orm";
import { getDb } from "../db";
import { tasks as tasksTable } from "../db/schema";
import { createTaskSchema, taskStatusSchema } from "./task.schema";

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

const tasks = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

tasks.use("*", authMiddleware);

tasks.get("/", async (c) => {
  const userId = c.get("userId");

  const status = c.req.query("status");

  let validatedStatus;

  if (status !== undefined) {
    const result = taskStatusSchema.safeParse(status);

    if (!result.success) {
      return c.json(
        {
          error: "Invalid status",
        },
        400
      );
    }

    validatedStatus = result.data;
  }

  const db = getDb(c.env.DB);

  const conditions = [eq(tasksTable.userId, userId)];

  if (validatedStatus !== undefined) {
    conditions.push(eq(tasksTable.status, validatedStatus));
  }

  const userTasks = await db
    .select()
    .from(tasksTable)
    .where(and(...conditions));

  return c.json({
    tasks: userTasks,
  });
});


tasks.post("/", async (c) => {
  const userId = c.get("userId");

  const body = await c.req.json();

  const result = createTaskSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: "Invalid input",
        details: result.error.flatten(),
      },
      400
    );
  }

  const { title, description, status, dueDate } = result.data;

  const now = Date.now();

  const db = getDb(c.env.DB);

  const insertedTask = await db
    .insert(tasksTable)
    .values({
      id: crypto.randomUUID(),
      userId,
      title,
      description,
      status: status ?? "todo",
      dueDate,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return c.json(
    {
      task: insertedTask[0],
    },
    201
  );
});


tasks.patch("/:id", async (c) => {
  const userId = c.get("userId");
  const taskId = c.req.param("id");

  const body = await c.req.json();

  const result = createTaskSchema
    .partial()
    .safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: "Invalid input",
        details: result.error.flatten(),
      },
      400
    );
  }

  const db = getDb(c.env.DB);

  const existingTask = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, taskId))
    .limit(1);

  if (!existingTask[0]) {
    return c.json({ error: "Task not found" }, 404);
  }

  if (existingTask[0].userId !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  const { title, description, status, dueDate } = result.data;

  const updatedTask = await db
    .update(tasksTable)
    .set({
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(dueDate !== undefined && { dueDate }),
      updatedAt: Date.now(),
    })
    .where(eq(tasksTable.id, taskId))
    .returning();

  return c.json({
    task: updatedTask[0],
  });
});


tasks.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const taskId = c.req.param("id");

  const db = getDb(c.env.DB);

  const existingTask = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, taskId))
    .limit(1);

  if (!existingTask[0]) {
    return c.json({ error: "Task not found" }, 404);
  }

  if (existingTask[0].userId !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  await db
    .delete(tasksTable)
    .where(eq(tasksTable.id, taskId));

  return c.json({
    message: "Task deleted successfully",
  });
});

tasks.get("/:id", async (c) => {
  const userId = c.get("userId");
  const taskId = c.req.param("id");

  const db = getDb(c.env.DB);

  const task = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, taskId))
    .limit(1);

  if (!task[0]) {
    return c.json({ error: "Task not found" }, 404);
  }

  if (task[0].userId !== userId) {
    return c.json({ error: "Forbidden" }, 403);
  }

  return c.json({
    task: task[0],
  });
});

export default tasks;