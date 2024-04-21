import jwt from "jsonwebtoken";
import z from "zod";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Razorpay from "razorpay";
import { nanoid } from "nanoid";
import crypto from "crypto";

const userSignup = async (req, res) => {
  const usernameSchame = z.string();
  const passwordSchame = z.string();

  const { name, email, password } = req.body;

  const user = usernameSchame.parse(email);
  const pass = passwordSchame.parse(password);

  const isUserExist = await User.findOne({
    username: user,
  });

  if (isUserExist) {
    return res.status(403).json({ message: "User is already exists" });
  }

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
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

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({ message: "User created successfully", accessToken, options });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err.message);
    });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: true,
  };
  try {
    const response = await User.findOne({
      email,
      password,
    });
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
      .json({ response: response, accessToken, options });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const getOrderId = async (courseId) => {
  try {
    const response = await Course.findById(courseId);
    const options = {
      amount: response.price * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: nanoid(),
    };
    return new Promise((resolve, reject) => {
      instance.orders.create(options, (err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const purchaseCourse = async (req, res) => {
  const { courseId } = req.body;
  const order = await getOrderId(courseId);
  let userId = req.user;

  return res.status(200).json({ order });
  // User.findByIdAndUpdate(
  //   userId,
  //   {
  //     $push: {
  //       purchasedCourses: courseId,
  //     },
  //   },
  //   { new: true }
  // )
  //   .then(() => {
  //     return res.status(200).json({ message: "success" });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return res.status(500).json("this is error", error);
  //   });
};

const getMyCourses = async (req, res) => {
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

const getCourse = async (req, res) => {
  const { course_id } = req.params;
  const response = await Course.findOne({
    courseId: course_id,
  });

  if (response === null) {
    return res.status(200).json({ message: "No course available" });
  }

  return res.status(200).json(response);
};

const getUser = async (req, res) => {
  const { accessToken } = req.body;
  console.log(accessToken);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = decoded._id;
    const response = await User.findById(user).select("-password -_id");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verfied successfully" });
    } else {
      return res.status(500).json({ message: "Invalid signature send" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export {
  userSignup,
  userLogin,
  purchaseCourse,
  getMyCourses,
  allCourses,
  getCourse,
  getUser,
  verifyPayment,
};
