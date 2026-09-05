import { createMiddleware } from "hono/factory";
import { jwtVerify } from "jose";

type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
};

type Variables = {
  userId: string;
};

export const authMiddleware = createMiddleware<{
  Bindings: Bindings;
  Variables: Variables;
}>(async (c, next) => {
  const authorization = c.req.header("Authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return c.json(
      {
        error: "Missing or invalid authorization header",
      },
      401
    );
  }

  const token = authorization.substring(7);

  try {
    const secret = new TextEncoder().encode(c.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    if (typeof payload.userId !== "string") {
      return c.json(
        {
          error: "Invalid token",
        },
        401
      );
    }

    c.set("userId", payload.userId);

    await next();
  } catch {
    return c.json(
      {
        error: "Invalid or expired token",
      },
      401
    );
  }
});