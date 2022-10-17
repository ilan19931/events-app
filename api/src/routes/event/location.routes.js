import express from "express";
import { body } from "express-validator";

import {
  addLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from "../../controllers/event/location.controller.js";

import { verifyUserToken } from "../../helpers/tokenVerify.js";

const router = express.Router();

router.get("/", verifyUserToken, getAllLocations);

router.get("/:id", getLocationById);

router.post(
  "/",
  [verifyUserToken, [body("name", "name is required").not().isEmpty()]],
  addLocation
);

router.put(
  "/:id",
  [verifyUserToken, [body("name", "name is required").not().isEmpty()]],
  updateLocation
);

router.delete("/:id", verifyUserToken, deleteLocation);

export default router;
