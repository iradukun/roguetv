import express from "express";
import {
  getStreamByUserController,
  getStreamsController,
  getStreamsRecommendedController,
  streamSearchController,
  updateStreamByIdController,
  updateStreamByUserIdController,
} from "../controllers/stream.controller";

const router = express.Router();

router.get("/search", streamSearchController);
router.get("/userid/:userId", getStreamByUserController);
router.get("/:userId", getStreamsController);
router.get("/recommended/:userId", getStreamsRecommendedController);
router.put("/userid/:userId", updateStreamByUserIdController);
router.put("/id/:id", updateStreamByIdController);
export default router;
