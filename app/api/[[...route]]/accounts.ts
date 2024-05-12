import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

// drizzle
import { and, eq, inArray } from "drizzle-orm";

// database
import { db } from "@/db";
import { accounts, insertAccountSchema } from "@/db/schema";

// id generation
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
    .get(
        "/",
        clerkMiddleware(),
        async (ctx) => {
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
        }
    )
    .get(
        "/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        clerkMiddleware(),
        async (ctx) => {
            const auth = getAuth(ctx);
            const { id } = ctx.req.valid("param");

            if (!id) return ctx.json({ error: "Missing id" }, 400);
            if (!auth?.userId) return ctx.json({ error: "Unauthorized" }, 401);

            const [data] = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(
                and(
                    eq(accounts.userId, auth.userId),
                    eq(accounts.id, id),
                ),
            );

            if (!data) return ctx.json({ error: "Not found" }, 404);

            return ctx.json({ data });
        },
    )
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
    )
    .post(
        "/bulk-delete",
        clerkMiddleware(),
        zValidator("json", z.object({
            ids: z.array(z.string()),
        })),
        async (ctx) => {
            const auth = getAuth(ctx);
            const values = ctx.req.valid("json");

            if (!auth?.userId) {
                return ctx.json({ error: "Unauthorized" }, 401);
            }

            const data = await db.delete(accounts).where(
                and(
                    eq(accounts.userId, auth.userId),
                    inArray(accounts.id, values.ids),
                )
            ).returning({
                id: accounts.id,
            });

            return ctx.json({ data });
        },
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        zValidator("json", insertAccountSchema.pick({
            name: true
        })),
        async (ctx) => {
            const auth = getAuth(ctx);
            const { id } = ctx.req.valid("param");
            const values = ctx.req.valid("json");
            
            if (!id) return ctx.json({ error: "Missing id" }, 400);
            if (!auth?.userId) return ctx.json({ error: "Unauthorized" }, 400);

            const [data] = await db.update(accounts).set(values).where(
                and(
                    eq(accounts.userId, auth.userId),
                    eq(accounts.id, id),
                ),
            ).returning();

            if (!data) return ctx.json({ error: "Not found" }, 404);

            return ctx.json({ data });
        }
    )

export default app;
