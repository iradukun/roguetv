import bodyParser from 'body-parser';
import express from "express";
import { livekitWebhook } from "../controllers/livekit.controller";
import { subscriptionWebhook } from "../controllers/subscription.controller";

const router = express.Router();

router.post("/livekit", livekitWebhook);
router.post(
  "/stripe",
  bodyParser.raw({ type: "application/json" }),
  subscriptionWebhook
);

export default router;
