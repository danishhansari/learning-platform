import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
