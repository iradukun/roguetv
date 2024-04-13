import express from "express";
import {
  checkUserBlocksController,
  checkUserFollowsController,
  getUserByIdController,
  getUserByUsernameController,
  updateUserController,
  userBlockController,
  userBlockListController,
  userFollowController,
  userFollowListController,
  userUnBlockController,
  userUnFollowController,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/username/:username", getUserByUsernameController);
router.get("/id/:id", getUserByIdController);
router.get("/follows/:userId/:id", checkUserFollowsController);
router.get("/blocks/:userId/:id", checkUserBlocksController);
router.get("/blocked/:userId/:id", checkUserBlocksController);
router.post("/follow", userFollowController);
router.get("/follow/:userId", userFollowListController);
router.post("/unfollow", userUnFollowController);
router.post("/block", userBlockController);
router.get("/block/:userId", userBlockListController);
router.post("/unblock", userUnBlockController);
router.put("/:userId", updateUserController);
export default router;
