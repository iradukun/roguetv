import express from "express";
import { createDonationController } from "../controllers/donate.controller";


const router = express.Router();

router.post("/", createDonationController);


export default router;
