import "dotenv/config"; // Ensures your .env file is loaded
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema/neon.prisma",
  datasource: {
    url: env("NEON_DATABASE_URL"), // Neon pooler URL for regular operations
  },
});
