// libs
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// drizzle schemas

export const sql = neon(process.env.DATABASE_URL as string);
export const db = drizzle(sql);
