import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// drizzle
import { eq } from "drizzle-orm";

// database
import { db } from "@/db";
import { accounts, insertAccountSchema } from "@/db/schema";

// id generation
import { createId } from "@paralleldrive/cuid2";

const app = new Hono()
    .get("/", clerkMiddleware(), async (ctx) => {
        const auth = getAuth(ctx);
        if (!auth?.userId) {
            return ctx.json({ error: "Unauthorized" }, 401);
        }

        const { id, name } = accounts;
        const data = await db
            .select({ id, name })
            .from(accounts)
            .where(eq(accounts.userId, auth.userId));

        return ctx.json({ data });
    })
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({ name: true })),
        async (ctx) => {
            const auth = getAuth(ctx);
            const values = ctx.req.valid("json");

            if (!auth?.userId) {
                return ctx.json({ error: "Unauthorized" }, 401);
            }

            const [data] = await db
                .insert(accounts)
                .values({
                    id: createId(),
                    userId: auth.userId,
                    ...values,
                })
                .returning();

            return ctx.json({ data });
        }
    );

export default app;