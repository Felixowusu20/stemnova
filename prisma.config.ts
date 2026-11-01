import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

loadEnv({ path: ".env.local" });
loadEnv();

function normalizeDatabaseUrl(url: string) {
  return url.replace(
    /([?&])sslmode=(require|prefer|verify-ca)(?=&|$)/gi,
    "$1sslmode=verify-full"
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: normalizeDatabaseUrl(env("DATABASE_URL")),
  },
});
