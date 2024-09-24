import { Router } from "express";
import {
  createUser,
  validateUserCredentials,
} from "../controllers/authController";

const authRouter = Router();

authRouter.route("/login").post(validateUserCredentials);
authRouter.route("/sign-up").post(createUser);

export default authRouter;
