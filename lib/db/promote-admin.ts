import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

async function main() {
  const { db, usersTable } = await import("./src/index");
  const { eq } = await import("drizzle-orm");

  console.log("🔒 VelvetCall Admin Promotion Utility");

  // Retrieve command line arguments or use default admin values
  const args = process.argv.slice(2);
  let email = "admin@velvetcall.com";
  let password = "adminpassword123";
  let name = "Administrator";

  args.forEach(arg => {
    if (arg.startsWith("--email=")) {
      email = arg.split("=")[1];
    }
    if (arg.startsWith("--password=")) {
      password = arg.split("=")[1];
    }
    if (arg.startsWith("--name=")) {
      name = arg.split("=")[1];
    }
  });

  email = email.toLowerCase().trim();

  try {
    // 1. Check if user exists
    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existing) {
      console.log(`👤 User "${email}" found in the database. Elevating to Admin role...`);
      await db
        .update(usersTable)
        .set({ role: "admin" })
        .where(eq(usersTable.email, email));
      console.log(`✅ Success! User "${email}" is now an Admin.`);
    } else {
      console.log(`👤 Creating a new Administrator user: "${email}"...`);
      
      const hashedPassword = bcrypt.hashSync(password, 10);
      
      await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Success! New administrator created successfully.");
      console.log(`👉 Login Email: ${email}`);
      console.log(`👉 Login Password: ${password}`);
    }
  } catch (err: any) {
    console.error("❌ Failed to register or promote admin user:", err.message);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
