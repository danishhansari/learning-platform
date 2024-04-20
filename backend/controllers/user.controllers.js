import jwt from "jsonwebtoken";
import z from "zod";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";

const userSignup = async (req, res) => {
  const usernameSchame = z.string();
  const passwordSchame = z.string();

  const { name, email, password } = req.body;

  const user = usernameSchame.parse(email);
  const pass = passwordSchame.parse(password);

  const isUserExist = await User.findOne({
    username: user,
  });
  console.log("is exists", isUserExist);

  if (isUserExist) {
    return res.status(403).json({ message: "User is already exists" });
  }

  const options = {
    httpOnly: true,
    secure: true,
  };
  const createdUser = User.create({
    name: name,
    email: user,
    password: pass,
  })
    .then((user) => {
      const accessToken = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      console.log(accessToken);

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({ message: "User created successfully", accessToken });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err.message);
    });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const options = {
    httpOnly: true,
    secure: true,
  };
  try {
    const response = await User.find({
      email,
      password,
    });
    if (response.length > 0) {
      const accessToken = jwt.sign(
        {
          _id: response._id,
          email: response.email,
          password: response.password,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(response);
    } else {
      return res.status(200).json(response);
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const purchaseCourse = async (req, res) => {
  const courseId = req.params.id;
  let userId = req.user;
  console.log(userId);
  try {
    const entry = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          purchasedCourses: courseId,
        },
      },
      { new: true }
    );
    return res.status(200).json(entry);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCourses = async (req, res) => {
  const userId = req.user;

  const user = await User.findById(userId);
  const response = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  return res.status(200).json(response);
};

const allCourses = async (req, res) => {
  const response = await Course.find({});
  return res.status(200).json({ response });
};

export { userSignup, userLogin, purchaseCourse, getCourses, allCourses };
