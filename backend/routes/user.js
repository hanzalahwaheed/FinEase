import express from "express";
import z from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware.js";
import Account from "../models/Accounts.js";

const router = express.Router();

const signUpBody = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success, data } = signUpBody.safeParse(req.body);
  if (!success) return res.status(400).json({ error: "Invalid input data" });

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser)
    return res.status(409).json({ error: "Email already in use" });

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const newUser = await User.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    const userId = newUser._id;
    await Account.create({
      userId: userId,
      balance: 1 + Math.random() * 100000,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const signInBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success, data } = signInBody.safeParse(req.body);
  if (!success) return res.status(400).json({ error: "Invalid input data" });

  const user = await User.findOne({ email: data.email });
  if (!user)
    return res.status(401).json({ error: "Invalid email or password" });

  const passwordMatch = bcrypt.compare(data.password, user.password);
  if (!passwordMatch)
    return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

const updateUserBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUserBody.safeParse(req.body);
  if (!success)
    res.status(411).json({
      message: "Error while updating information",
    });
  try {
    await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log("update", error);
  }
});

// search bar functionality or get all users
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default router;
