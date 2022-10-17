import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import applyAllRoutes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//apply all routes
applyAllRoutes(app);

//Error handling (Should be last middleware)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const port = process.env.SERVER_PORT || 3005;
app.listen(port, (err) => {
  if (!err) {
    console.log("Server started on port: " + port);

    mongoose.connect(process.env.CONNECTION_STRING, (err) => {
      if (!err) {
        console.log("Connected to mongodb");
      } else {
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});
