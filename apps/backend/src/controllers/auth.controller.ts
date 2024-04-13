import { Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import AuthError from '../errors/AuthError';
import { loginUser, registerUser } from '../services/auth-service';

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    await loginUser(body.password, body.email);

    res.sendStatus(200);
  } catch (error: any) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const registerController = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    await registerUser({
      email: body.email,
      password: body.password,
      first_name: body.first_name,
      last_name: body.last_name,
      username: body.username,
    });

    res.sendStatus(200);
  } catch (error: any) {
    if (error instanceof AuthError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
