import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required for a user!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required for a user!"],
  },
});

export const User = model("User", userSchema);
