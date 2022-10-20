import mongoose from "mongoose";
import Comment from "../models/comment.model.js";
import { validationResult } from "express-validator";

import createError from "../helpers/error.js";

export const getAllEventComments = async (req, res, next) => {
  const eventId = req.params.eventId;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(eventId)) {
    return next(createError(403, "Invalid event id"));
  }

  try {
    const foundComments = await Comment.find({ eventId }).sort({ createdAt: -1 });

    res.send(foundComments);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const getCommentById = async (req, res, next) => {
  const commentId = req.params.commentId;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(locationId)) {
    return next(createError(403, "Invalid comment id"));
  }

  try {
    const foundComment = await Location.findById(commentId);

    res.send(foundLocation);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const addComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const newComment = new Comment({ ...req.body, userId: req.user._id });

  try {
    const savedComment = await newComment.save();

    res.send(savedComment);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const updateComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const commentId = req.params.commentId;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(locationId)) {
    return next(createError(403, "Invalid comment id"));
  }

  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, userId: req.user._id },
      { $set: req.body },
      { new: true }
    );

    res.send(updatedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(locationId)) {
    return next(createError(403, "Invalid comment id"));
  }

  try {
    const isDeleted = await Comment.findOneAndDelete({ _id: commentId, userId: req.user._id });
    if (!isDeleted) {
      return next(createError(403, "invalid comment id"));
    }

    res.send("Comment deleted");
  } catch (err) {
    next({ status: 403, message: err });
  }
};
