import { defineConfig } from "drizzle-kit";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local in the root directory
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
});
