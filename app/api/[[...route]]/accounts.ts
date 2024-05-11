import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

// drizzle
import { eq } from "drizzle-orm";

// database
import { db } from "@/db";
import { accounts } from "@/db/schema";

const app = new Hono().get("/", clerkMiddleware(), async (ctx) => {
    const auth = getAuth(ctx);
    if (!auth?.userId) {
        throw new HTTPException(401, {
            res: ctx.json({ error: "Unauthorized" }, 401),
        });
    }

    const { id, name } = accounts;
    const data = await db.select({ id, name }).from(accounts).where(eq(accounts.userId, auth.userId));

    return ctx.json({ data });
});

export default app;
