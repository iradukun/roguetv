import bcrypt from "bcrypt";
import ApiError from "../errors/ApiError";
import AuthError from "../errors/AuthError";
import { Stream } from "../models/stream.model";
import { User } from "../models/user.model";

export const registerUser = async (user: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  try {
    const checkUserEmail = await User.findOne({ email: user.email });
    if (checkUserEmail) {
      throw new AuthError("Email already exists");
    }

    const checkUserUsername = await User.findOne({ username: user.username });
    if (checkUserUsername) {
      throw new AuthError("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      username: user.username,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      imageUrl: "https://api.dicebear.com/8.x/identicon/svg?seed=Pepper",
      password: hashedPassword,
    });

    await newUser.save();

    const newStream = new Stream({
      name: `${user.username}'s stream`,
      userId: newUser.id,
    });

    await newStream.save();

    return newUser;
  } catch (error: any) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error(error);
    throw new ApiError("Internal error: " + error.message, 500);
  }
};

export const loginUser = async (password: string, email: string) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AuthError("Bad credentials");
    }

    if (!(await bcrypt.compare(password, user.password ?? ""))) {
      throw new AuthError("Bad credentials");
    }

    return user;
  } catch (error: any) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error(error);
    throw new ApiError("Internal error: " + error.message, 500);
  }
};
