import { Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { createDonation } from "../services/donate-service";

export const createDonationController = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await createDonation(amount);

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error: any) {
    if (error instanceof ApiError) {
      console.log(error.message);
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
