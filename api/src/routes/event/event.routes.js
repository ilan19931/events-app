import express from "express";
import { body } from "express-validator";
import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
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
      body("categoryId", "category id is required").not().isEmpty(),
      body("locationId", "location id is required").not().isEmpty(),
      body("severityId", "severity id is required").not().isEmpty(),
    ],
  ],
  addEvent
);

router.put("/:id", verifyUserToken, updateEvent);

router.delete("/:id", verifyUserToken, deleteEvent);

export default router;
