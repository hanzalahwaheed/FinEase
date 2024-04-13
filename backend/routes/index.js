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
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
