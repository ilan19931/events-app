import express from "express";
import { body } from "express-validator";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getStatistics,
  updateEvent,
} from "../../controllers/event/event.controller.js";
import { verifyUserToken } from "../../helpers/tokenVerify.js";

const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  [
    verifyUserToken,
    [
      body("body", "body is required").not().isEmpty(),
      body("category", "category id is required").not().isEmpty(),
      body("location", "location id is required").not().isEmpty(),
      body("severity", "severity id is required").not().isEmpty(),
    ],
  ],
  addEvent
);

router.put("/:id", verifyUserToken, updateEvent);

router.delete("/:id", verifyUserToken, deleteEvent);

router.get("/get/statistics", getStatistics);

export default router;
