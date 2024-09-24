import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_USERNAME = process.env.MONGO_USERNAME;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const USERNAME_REGEX = /^[A-Za-z0-9_-]{4,20}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(){}|`~<>?,./;':"_+-=]).{8,24}$/;
