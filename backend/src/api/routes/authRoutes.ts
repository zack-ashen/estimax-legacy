import express from "express";
import { validateSignUp } from "./../middleware/validation/auth";

import AuthController from "../controllers/authController/authController";

const router = express.Router();

const authController = new AuthController();

/*
 * /signup verifies the user does not exist and then creates a new user.
 */
router.post("/signup", validateSignUp, authController.signup);

/* /signin verifies the user exists and then compares the sent password
 * with the stored password. If the passwords match, it returns a token.
 */
router.post("/signin", authController.signin);

/* /logout deletes the refresh token from the database. */
router.post("/signout", authController.signout);

/* /google verifies the google credential and then creates or signs in the user.
 */
router.post("/google", authController.googleAuth);

/* /refreshToken verifies the refresh token and then returns a new token. */
router.get("/refresh", authController.refreshToken);

/* /checkEmail checks if the email is already in use. */
router.post("/checkEmail", authController.checkEmail);

export default router;
