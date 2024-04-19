import { Router } from "express";
import {
  adminSignup,
  adminLogin,
  uploadCourse,
} from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middleware/verify.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "App is working fine" });
});

router.post("/signup", adminSignup);
router.post("/signin", adminLogin);

router.post("/upload-course", verifyJWT, uploadCourse);

export default router;
