import jwt from "jsonwebtoken";
import z from "zod";
import Admin from "../models/admin.model.js";
import Course from "../models/course.model.js";

const adminSignup = async (req, res) => {
  const usernameSchema = z.string();
  const passwordSchema = z.string();

  const { username, password } = req.body;

  const user = usernameSchema.parse(username);
  const pass = passwordSchema.parse(password);

  const isUserExist = await Admin.findOne({
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
  const createdUser = Admin.create({
    username: user,
    password: pass,
  })
    .then((user) => {
      console.log("this is updated user", user);
      const accessToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
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

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const options = {
    httpOnly: true,
    secure: true,
  };
  try {
    const response = await Admin.find({
      username,
      password,
    });
    if (response.length > 0) {
      const accessToken = jwt.sign(
        {
          _id: response._id,
          username: response.username,
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

const uploadCourse = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const entry = await Course.create({
      title,
      description,
      price,
    });
    return res.status(200).json("course uploaded successfully");
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export { adminSignup, adminLogin, uploadCourse };
