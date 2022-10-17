import mongoose from "mongoose";
import Severity from "../../models/event/severity.model.js";
import { validationResult } from "express-validator";

import createError from "../../helpers/error.js";

export const getAllSeverities = async (req, res, next) => {
  const severities = await Severity.find();

  res.send(severities);
};

export const getSeverityById = async (req, res, next) => {
  const severityId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(severityId)) {
    return next(createError(403, "Invalid severity id"));
  }

  try {
    const foundSeverity = await Severity.findById(severityId);

    res.send(foundSeverity);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const addSeverity = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const newSeverity = new Severity(req.body);

  try {
    const savedSeverity = await newSeverity.save();

    res.send(savedSeverity);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const updateSeverity = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const severityId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(severityId)) {
    return next(createError(403, "Invalid severity id"));
  }

  try {
    const updatedSeverity = await Severity.findByIdAndUpdate(
      severityId,
      { $set: req.body },
      { new: true }
    );

    res.send(updatedSeverity);
  } catch (err) {
    next(err);
  }
};

export const deleteSeverity = async (req, res, next) => {
  const severityId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(severityId)) {
    return next(createError(403, "Invalid severity id"));
  }

  try {
    const isDeleted = await Severity.findByIdAndDelete(severityId);
    if (!isDeleted) {
      return next(createError(403, "invalid severity id"));
    }

    res.send("Severity deleted");
  } catch (err) {
    next({ status: 403, message: err });
  }
};
