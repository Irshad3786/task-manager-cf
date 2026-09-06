import { Hono } from "hono";
import { getDb } from "./db";
import auth from "./routes/auth";
import tasks from "./routes/tasks";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();


app.use(
  "/api/*",
  cors({
    origin: (origin, c) => {
      return origin === c.env.FRONTEND_URL ? origin : "";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);


app.get("/", (c) => {
  const db = getDb(c.env.DB);

  return c.json({
    message: "Task Manager API is running",
  });
});



app.route("/api/auth", auth);
app.route("/api/tasks", tasks);

export default app;