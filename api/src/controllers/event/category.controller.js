import mongoose from "mongoose";
import Category from "../../models/event/category.model.js";
import { validationResult } from "express-validator";

import createError from "../../helpers/error.js";

export const getAllCategories = async (req, res, next) => {
  const categories = await Category.find();

  res.send(categories);
};

export const getCategoryById = async (req, res, next) => {
  const categoryId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(categoryId)) {
    return next(createError(403, "Invalid category id"));
  }

  try {
    const foundCategory = await Category.findById(categoryId);

    res.send(foundCategory);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const addCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();

    res.send(savedCategory);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const updateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const categoryId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(categoryId)) {
    return next(createError(403, "Invalid category id"));
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: req.body },
      { new: true }
    );

    res.send(updatedCategory);
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(categoryId)) {
    return next(createError(403, "Invalid category id"));
  }

  try {
    const isDeleted = await Category.findByIdAndDelete(categoryId);
    if (!isDeleted) {
      return next(createError(403, "invalid category id"));
    }

    res.send("category deleted");
  } catch (err) {
    next({ status: 403, message: err });
  }
};
