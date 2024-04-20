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
    courseId: {
      type: String,
      require: true,
      unique: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
