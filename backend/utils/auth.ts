import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAdmin } from "../models/Admin";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES_IN = "7d"; 

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}


export function signToken(admin: IAdmin): string {
  return jwt.sign(
    { id: admin._id.toString(), username: admin.username, role: "ADMIN" },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token?: string) {
  if (!token) return null;
  try {
    const cleaned = token.startsWith("Bearer ") ? token.slice(7) : token;
    return jwt.verify(cleaned, JWT_SECRET) as { id: string; username: string; role: string };
  } catch {
    return null;
  }
}
