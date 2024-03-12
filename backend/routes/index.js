import express from "express";
import userRouter from "./user.js";
import accountRouter from "./accounts.js";
const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
