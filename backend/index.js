// imports
import express from "express";
import { connect } from "mongoose";
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
connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
    // start server
    app.listen(PORT, () => console.log("server is running"));
  })
  .catch((err) => console.log(err));
