import { Router } from "express";
import {
  userSignup,
  userLogin,
  purchaseCourse,
  getMyCourses,
  allCourses,
  getCourse,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/verify.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "App is working fine" });
});

router.post("/signup", userSignup);
router.post("/signin", userLogin);

router.post("/purchase-course/:id", verifyJWT, purchaseCourse);
router.get("/get-my-courses", verifyJWT, getMyCourses);
router.get("/all-courses", allCourses);
router.get("/get-course/:course_id", getCourse);

export default router;
