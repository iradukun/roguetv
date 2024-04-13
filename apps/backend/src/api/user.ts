import express from "express";
import {
  checkUserBlocksController,
  checkUserFollowsController,
  getUserByIdController,
  getUserByUsernameController,
  userBlockController,
  userFollowController,
  userUnBlockController,
  userUnFollowController,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/username/:username", getUserByUsernameController);
router.get("/id/:id", getUserByIdController);
router.get("/follows/:userId/:id", checkUserFollowsController);
router.get("/blocks/:userId/:id", checkUserBlocksController);
router.post("/follow", userFollowController);
router.post("/unfollow", userUnFollowController);
router.post("/block", userBlockController);
router.post("/unblock", userUnBlockController);
export default router;
