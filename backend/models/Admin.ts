import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    
    },
    password: {
      type: String,
      required: true,
      minlength:8,
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  const admin = this as IAdmin;
  if (!admin.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  next();
});

AdminSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
export default AdminModel;
