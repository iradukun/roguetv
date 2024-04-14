import express from "express";
import { getBroadcastsController } from "../controllers/broadcast.controller";

const router = express.Router();

router.get("/:userId", getBroadcastsController);

export default router;
