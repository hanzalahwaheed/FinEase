import express from "express";
import userRouter from "./user.js";
import accountRouter from "./accounts.js";
import authMiddleware from "../middleware.js";
import User from "../models/User.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

// check if auth route
router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await User.find({ userId });
  if (userId) return res.status(200).json({ user });
});

export default router;
