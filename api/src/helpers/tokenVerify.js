import jwt from "jsonwebtoken";
import createError from "./error.js";

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(
      createError(401, { errors: [{ msg: "No token. auth failed" }] })
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const user = jwt.decode(token);

    req.user = user;

    next();
  } catch (err) {
    next({ status: 401, message: "Bad token. auth failed" });
  }
};
