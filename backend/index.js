// imports
import express from "express";
import mongoose from "mongoose";
import rootRouter from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1", rootRouter);

// mongoDB connection
const db = await mongoose.connect(process.env.MONGO_URL);
if (db) {
  app.listen(PORT, () => console.log("connected to DB and server running"));
}
