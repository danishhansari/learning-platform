import mongoose, { Schema } from "mongoose";

const adminSchema = Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
