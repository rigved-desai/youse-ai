import { Router } from "express";
import {
  createUser,
  validateUserCredentials,
} from "../controllers/authController";
import { validateToken } from "../middleware/authMiddleware";
import { Response, Request } from "express";

const authRouter = Router();

authRouter.route("/login").post(validateUserCredentials);
authRouter.route("/sign-up").post(createUser);

authRouter
  .route("/validate-token")
  .get(validateToken, (_: Request, res: Response) => {
    return res.status(200).json(null);
  });

export default authRouter;
