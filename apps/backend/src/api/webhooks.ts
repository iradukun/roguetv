import express from "express";
import { livekitWebhook } from "../controllers/livekit.controller";


const router = express.Router();

router.post("/livekit", livekitWebhook);


export default router;
