import express from "express";
import { body } from "express-validator";
import {
  addComment,
  deleteComment,
  getAllEventComments,
  getCommentById,
  updateComment,
} from "../controllers/comment.controller.js";
import { verifyUserToken } from "../helpers/tokenVerify.js";

const router = express.Router();

router.get("/:eventId", verifyUserToken, getCommentById);

router.get("/all/:eventId", verifyUserToken, getAllEventComments);

router.post("/", [verifyUserToken, [body("body", "body is required")]], addComment);

router.put("/:commentId", verifyUserToken, updateComment);

router.delete("/:commentId", verifyUserToken, deleteComment);

export default router;
