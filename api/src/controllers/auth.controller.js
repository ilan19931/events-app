import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import createError from "../helpers/error.js";
import User from "../models/user.model.js";

export const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(createError(403, "Wrong credentials"));
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return next(createError(403, "Wrong credentials"));
    }

    const { password: passwordRemoved, ...other } = foundUser._doc;
    const token = jwt.sign(other, process.env.JWT_SECRET);

    res.cookie("access_token", token).send({ user: other, token });
  } catch (err) {
    next(err);
  }
};

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createError(403, errors));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({ ...req.body, password: hashedPassword });

  try {
    const savedUser = await newUser.save();
    const { password, ...other } = savedUser._doc;

    const token = jwt.sign(other, process.env.JWT_SECRET);

    res.cookie("access_token", token).send({ user: other, token });
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
