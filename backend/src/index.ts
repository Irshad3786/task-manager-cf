import { Hono } from "hono";
import { getDb } from "./db";
import auth from "./routes/auth";
import tasks from "./routes/tasks";

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  const db = getDb(c.env.DB);

  return c.json({
    message: "Task Manager API is running",
  });
});

app.route("/api/auth", auth);
app.route("/api/tasks", tasks);

export default app;