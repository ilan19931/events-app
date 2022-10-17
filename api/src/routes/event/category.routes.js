import express from "express";
import { body } from "express-validator";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../../controllers/event/category.controller.js";
import { verifyUserToken } from "../../helpers/tokenVerify.js";

const router = express.Router();

router.get("/", verifyUserToken, getAllCategories);

router.get("/:id", getCategoryById);

router.post(
  "/",
  [verifyUserToken, [body("name", "name is required").not().isEmpty()]],
  addCategory
);

router.put(
  "/:id",
  [verifyUserToken, [body("name", "name is required").not().isEmpty()]],
  updateCategory
);

router.delete("/:id", verifyUserToken, deleteCategory);

export default router;
