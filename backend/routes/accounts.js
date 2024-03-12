import express from "express";
import mongoose from "mongoose";
import authMiddleware from "../middleware.js";
import Account from "../models/Accounts.js";

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const response = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: response.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  console.log(amount, to);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Insufficient Funds (ur poor lol)" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }

    console.log(account.balance);
    console.log(toAccount.balance);

    const updatedSenderAccount = await Account.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { balance: -amount } },
      { new: true }
    ).session(session);

    const updatedRecieverAccount = await Account.findOneAndUpdate(
      { userId: to },
      { $inc: { balance: amount } },
      { new: true }
    ).session(session);

    await session.commitTransaction();

    console.log(updatedSenderAccount.balance);
    console.log(updatedRecieverAccount.balance);

    res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    res.status(500).json({ message: "Transaction Error", error });
  }
});

export default router;
