import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const getUser = async (req, res, next) => {
  res.send(req.user);
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  // check if id is valid ObjectId
  if (!mongoose.isValidObjectId(userId)) {
    return next(createError(403, "Invalid category id"));
  }

  try {
    const foundUser = await User.findById(userId);

    res.send(foundUser);
  } catch (err) {
    next({ status: 403, message: err });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const foundUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },
      { new: true }
    );

    //update the cookie
    const { password, ...other } = foundUser._doc;
    const newToken = jwt.sign(other, process.env.JWT_SECRET);

    res.cookie("access_token", newToken).send(foundUser);
  } catch (err) {
    next({ status: 403, message: err.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    // remove cookie
    res.clearCookie("access_token").send("user has been deleted");
  } catch (err) {
    next({ status: 403, message: err.message });
  }
};
