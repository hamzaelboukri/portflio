import mongoose from "mongoose";
import connectDB from "../config/db";
import Admin, { IAdmin } from "../models/Admin";

// Minimal, safe defaults — override with env vars
const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@12345";

async function seedAdmin() {
  try {
    await connectDB();

    // Check by email OR username to avoid duplicates across runs
    const existing = await Admin.findOne({
      $or: [{ email: DEFAULT_EMAIL }, { username: DEFAULT_USERNAME }],
    });

    if (existing) {
      console.log("Admin already exists:", {
        id: existing._id.toString(),
        username: existing.username,
        email: existing.email,
      });
      return;
    }

    const admin = new Admin({
      username: DEFAULT_USERNAME,
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD, // Will be hashed by pre-save hook
    } as Partial<IAdmin>);

    await admin.save();

    console.log("Admin user created successfully:", {
      id: admin._id.toString(),
      username: admin.username,
      email: admin.email,
    });
    console.log("Login with these credentials (change ASAP):");
    console.log("username:", DEFAULT_USERNAME);
    console.log("email:", DEFAULT_EMAIL);
    console.log("password:", DEFAULT_PASSWORD);
  } catch (err) {
    console.error("Admin seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
