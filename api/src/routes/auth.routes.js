import express from "express";
import { body } from "express-validator";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { verifyUserToken } from "../helpers/tokenVerify.js";
const router = express.Router();

router.get("/", verifyUserToken, (req, res, next) => {});

router.post(
  "/signin",
  [
    body("email", "email is required").not().isEmpty(),
    body("password", "password is required").not().isEmpty(),
  ],
  signIn
);

router.post(
  "/signup",
  [
    body("email", "email is required").not().isEmpty(),
    body("password", "password is required").not().isEmpty(),
  ],
  signUp
);

export default router;
