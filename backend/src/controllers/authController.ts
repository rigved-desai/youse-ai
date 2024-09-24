import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import * as userService from "../services/userService";
import { handleError } from "../utils/utils";

export type TokenPayload = {
  username: string;
};

function generateToken(payload: TokenPayload) {
  const options = {
    expiresIn: "12h",
  };
  if (!JWT_SECRET) {
    throw Error("Error creating JWT: No secret defined");
  }
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

export type CreateUserRequest = {
  username?: string;
  password?: string;
};

export async function createUser(
  req: Request<{}, {}, CreateUserRequest>,
  res: Response
) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "Invalid arguments: Username and password are required!",
    });
  }
  try {
    const user = await userService.createUser(username, password);
    return res.status(201).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: handleError(err),
    });
  }
}

export type ValidateUserCredentialsRequest = {
  username?: string;
  password?: string;
};

export async function validateUserCredentials(
  req: Request<{}, {}, ValidateUserCredentialsRequest>,
  res: Response
) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "Invalid arguments: Username and password are required!",
    });
  }
  try {
    const isValid = await userService.validateUserCredentials(
      username,
      password
    );
    if (!isValid) {
      return res.status(401).json({
        error: "Wrong password for given username!",
      });
    }
    const token = generateToken({ username });
    res.set("Authorization", "Bearer " + token);
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      error: handleError(err),
    });
  }
}
