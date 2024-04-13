import ApiError from "../errors/ApiError";
import AuthError from "../errors/AuthError";
import { db } from "../lib/db";
import bcrypt from "bcrypt"

export const registerUser = async (user: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}) => {
  try {
    const check_user_email = await db.user.count({
      where: {
        email: user.email,
      },
    });

    if (check_user_email > 0) {
      throw new AuthError('Email already exists');
    }
    const check_user_username = await db.user.count({
      where: {
        username: user.username,
      },
    });
    if (check_user_username > 0) {
      throw new AuthError('Username already exists');
    }

    const hashed_password = await bcrypt.hash(user.password, 10);

    await db.user.create({
      data: {
        username: user.username,
        name: user.first_name + " " + user.last_name,
        email: user.email,
        imageUrl: 'https://api.dicebear.com/8.x/identicon/svg?seed=Pepper',
        stream: {
          create: {
            name: `${user.username}'s stream`,
          },
        },
        password: hashed_password
      },
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error(error);
    throw new ApiError('Internal error: ' + error.message, 500);
  }
};

export const loginUser = async (password: string, email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      }
    })
    if (!user) {
      throw new AuthError('Bad credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AuthError('Bad credentials');
    }
  } catch (error: any) {
    if (error instanceof AuthError) {
      throw error;
    }
    console.error(error);
    throw new ApiError('Internal error: ' + error.message, 500);
  }
};
