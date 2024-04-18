import { Router } from "express";
import { adminSignup, adminLogin } from "../controllers/admin.controllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "App is working fine" });
});

router.post("/signup", adminSignup);
router.post("/signin", adminLogin);

export default router;
