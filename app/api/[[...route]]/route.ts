import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

// routers
import accounts from "./accounts";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;