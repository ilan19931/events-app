import mongoose from "mongoose";

import User from "../../models/user.model.js";
import Event from "../../models/event/event.model.js";
import Category from "../../models/event/category.model.js";
import Location from "../../models/event/location.model.js";
import Severity from "../../models/event/severity.model.js";

import { validationResult } from "express-validator";

import createError from "../../helpers/error.js";

export const getAllEvents = async (req, res, next) => {
  const events = await Event.find({ isOpen: true })
    .populate({ path: "user", model: User })
    .populate({ path: "category", model: Category })
    .populate({ path: "location", model: Location })
    .populate({ path: "severity", model: Severity })
    .sort({ createdAt: -1 });

  res.send(events);
};

export const getEventById = async (req, res, next) => {
  const eventId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(403, "Invalid event id"));
  }

  try {
    const foundEvent = await Event.findById(eventId);

    res.send(foundEvent);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const addEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const newEvent = new Event({ ...req.body, user: req.user._id });

  try {
    // check if all ids are valid
    const foundCategory = await Category.findById(newEvent.category);
    if (!foundCategory) {
      return next(createError(403, "Invalid category id"));
    }

    const foundLocation = await Location.findById(newEvent.location);
    if (!foundLocation) {
      return next(createError(403, "Invalid location id"));
    }

    const foundSeverity = await Severity.findById(newEvent.severity);
    if (!foundSeverity) {
      return next(createError(403, "Invalid severity id"));
    }

    // save event to db
    const savedEvent = await newEvent.save();

    res.send(savedEvent);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const updateEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const eventId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(403, "Invalid event id"));
  }

  try {
    const { category, location, severity } = req.body;

    // check if all ids are valid
    const foundCategory = await Category.findById(category);
    if (category && !foundCategory) {
      return next(createError(403, "Invalid category id"));
    }

    const foundLocation = await Location.findById(location);
    if (location && !foundLocation) {
      return next(createError(403, "Invalid location id"));
    }

    const foundSeverity = await Severity.findById(severity);
    if (severity && !foundSeverity) {
      return next(createError(403, "Invalid severity id"));
    }

    //save updated event
    const updatedEvent = await Event.findByIdAndUpdate(eventId, { $set: req.body }, { new: true });

    res.send(updatedEvent);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  const eventId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(403, "Invalid event id"));
  }

  try {
    const isDeleted = await Event.findByIdAndDelete(eventId);
    if (!isDeleted) {
      return next(createError(403, "invalid event id"));
    }

    res.send("event deleted");
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const getStatistics = async (req, res, next) => {
  const allEvents = await Event.find();
  let openEvents = 0;

  allEvents.map((e) => {
    if (e.isOpen) {
      openEvents += 1;
    }
  });

  const data = {
    all: allEvents.length,
    open: openEvents,
  };

  res.send(data);
};
