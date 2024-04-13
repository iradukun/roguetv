import express from "express";
import {
  getStreamByUserController,
  streamSearchController,
} from "../controllers/stream.controller";

const router = express.Router();

router.get("/search", streamSearchController);
router.get("/userid/:userId", getStreamByUserController);
router.get("/", getStreamByUserController);
export default router;
