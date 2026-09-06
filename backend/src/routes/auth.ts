import { Hono } from "hono";
import { hash, compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { SignJWT } from "jose";

import { getDb } from "../db";
import { users } from "../db/schema";
import { loginSchema, registerSchema } from "./auth.schema";
import { authMiddleware } from "../middleware/auth";

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

const auth = new Hono<{ Bindings: Bindings }>();

auth.post("/register", async (c) => {
  // 1. Read request body
  const body = await c.req.json();

  // 2. Validate with Zod
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: "Invalid input",
        details: result.error.flatten(),
      },
      400
    );
  }

  const { name, email, password } = result.data;

  // 3. Get Drizzle database
  const db = getDb(c.env.DB);

  // 4. Check if email already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return c.json(
      {
        error: "Email already registered",
      },
      409
    );
  }

  // 5. Hash password
  const passwordHash = await hash(password, 10);

  // 6. Insert user into D1
  const insertedUser = await db
  .insert(users)
  .values({
    id: crypto.randomUUID(),
    name,
    email,
    password: passwordHash,
    createdAt: Date.now(),
  })
  .returning({
    id: users.id,
    name: users.name,
    email: users.email,
  });

  // 7. Return created user
  return c.json(
    {
      user: insertedUser[0],
    },
    201
  );
});



auth.post("/login", async (c) => {
  const body = await c.req.json();

  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return c.json(
      {
        error: "Invalid input",
        details: result.error.flatten(),
      },
      400
    );
  }

  const { email, password } = result.data;

  const db = getDb(c.env.DB);

  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = userResult[0];

  if (!user) {
    return c.json(
      {
        error: "Invalid email or password",
      },
      401
    );
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    return c.json(
      {
        error: "Invalid email or password",
      },
      401
    );
  }

  const secret = new TextEncoder().encode(c.env.JWT_SECRET);

  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return c.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});


auth.get("/me", authMiddleware, async (c) => {
  const userId = c.get("userId");

  const db = getDb(c.env.DB);

  const userResult = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = userResult[0];

  if (!user) {
    return c.json(
      {
        error: "User not found",
      },
      404
    );
  }

  return c.json({
    user,
  });
});

export default auth;