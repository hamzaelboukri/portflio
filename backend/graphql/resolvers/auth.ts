import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../../models/Admin";

export const authResolvers = {
  Mutation: {
    login: async (_: any, { username, password }: { username: string; password: string }) => {
      const admin = await Admin.findOne({ username });
      if (!admin) throw new Error("Admin not found");

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      return {
        token,
        admin,
      };
    },
  },
};
    