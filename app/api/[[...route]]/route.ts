import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/hello", (ctx) => {
    return ctx.json({
        hello: "Next.js!",
    });
});

export const GET = handle(app);
export const POST = handle(app);
