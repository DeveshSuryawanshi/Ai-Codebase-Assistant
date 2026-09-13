import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]).default("development"),
  CODEBASE_ASSISTANT_API_URL: z.url(),
  DATABASE_URL: z.url(),
  AUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.url(),
  GITHUB_ID: z.string().min(1),
  GITHUB_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const parsedEnv = envSchema.safeParse({
  APP_ENV: process.env.APP_ENV,
  CODEBASE_ASSISTANT_API_URL: process.env.CODEBASE_ASSISTANT_API_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
