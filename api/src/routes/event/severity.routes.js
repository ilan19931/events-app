import express from "express";
import { body } from "express-validator";
import {
  addSeverity,
  deleteSeverity,
  getAllSeverities,
  getSeverityById,
  updateSeverity,
} from "../../controllers/event/severity.controller.js";
import { verifyUserToken } from "../../helpers/tokenVerify.js";

const router = express.Router();

router.get("/", verifyUserToken, getAllSeverities);

router.get("/:id", getSeverityById);

router.post(
  "/",
  [verifyUserToken, [body("name", "name is required").not().isEmpty()]],
  addSeverity
);

router.put(
  "/:id",
  [verifyUserToken, [body("name", "name is required").not().isEmpty()]],
  updateSeverity
);

router.delete("/:id", verifyUserToken, deleteSeverity);

export default router;
