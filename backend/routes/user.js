import express from "express";
import z from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
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

  const passwordMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordMatch)
    return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
