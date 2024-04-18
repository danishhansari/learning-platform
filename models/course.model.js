import mongoose, { Schema } from "mongoose";

const courseSchema = Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", courseSchema);

export default Course;
