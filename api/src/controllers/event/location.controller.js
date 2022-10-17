import mongoose from "mongoose";
import Location from "../../models/event/location.model.js";
import { validationResult } from "express-validator";

import createError from "../../helpers/error.js";

export const getAllLocations = async (req, res, next) => {
  const locations = await Location.find();

  res.send(locations);
};

export const getLocationById = async (req, res, next) => {
  const locationId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(locationId)) {
    return next(createError(403, "Invalid location id"));
  }

  try {
    const foundLocation = await Location.findById(locationId);

    res.send(foundLocation);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const addLocation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const newLocation = new Location(req.body);

  try {
    const savedLocation = await newLocation.save();

    res.send(savedLocation);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const updateLocation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const locationId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(locationId)) {
    return next(createError(403, "Invalid location id"));
  }

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      { $set: req.body },
      { new: true }
    );

    res.send(updatedLocation);
  } catch (err) {
    next(err);
  }
};

export const deleteLocation = async (req, res, next) => {
  const locationId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(locationId)) {
    return next(createError(403, "Invalid location id"));
  }

  try {
    const isDeleted = await Location.findByIdAndDelete(locationId);
    if (!isDeleted) {
      return next(createError(403, "invalid location id"));
    }

    res.send("Location deleted");
  } catch (err) {
    next({ status: 403, message: err });
  }
};
