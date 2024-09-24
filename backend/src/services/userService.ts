import * as bcyrpt from "bcrypt";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../config/config";
import { User } from "../models/userModel";

export async function createUser(username: string, password: string) {
  const usernameValidator = new RegExp(USERNAME_REGEX);
  const passwordValidator = new RegExp(PASSWORD_REGEX);

  if (!usernameValidator.test(username)) {
    throw Error(
      "Invalid username. Should consist of atleast 4 characters and at most 20 characters. No special characters except underscores and hyphens allowed."
    );
  }

  if (!passwordValidator.test(password)) {
    throw Error(
      "Invalid password. Should consist of at least 8 characters, 1 uppercase character, 1 lowercase character, 1 number and 1 symbol."
    );
  }
  try {
    const hashedPassword = await bcyrpt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    return user;
  } catch (err) {
    console.log(err);
    throw Error("Username is already in use!");
  }
}

export async function validateUserCredentials(
  username: string,
  password: string
) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw Error("User does not exist!");
    }
    return await bcyrpt.compare(password, user.password);
  } catch (err) {
    throw err;
  }
}

export async function getUser(username: string) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw Error("User with given username not found!");
    }
    return user;
  } catch (err) {
    throw err;
  }
}
