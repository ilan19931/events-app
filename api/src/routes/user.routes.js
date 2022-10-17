import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
  getUserById,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../helpers/tokenVerify.js";
const router = express.Router();

router.get("/", verifyUserToken, getUser);

router.get("/:id", getUserById);

router.put("/", verifyUserToken, updateUser);

router.delete("/", verifyUserToken, deleteUser);

export default router;
