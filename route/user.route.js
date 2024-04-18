import { Router } from "express";
import { userSignup, userLogin } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "App is working fine" });
});

router.post("/signup", userSignup);
router.post("/signin", userLogin);

export default router;
