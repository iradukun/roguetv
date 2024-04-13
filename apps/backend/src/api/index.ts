import express from "express";
import auth from "./auth";
import stream from "./stream";
import subscription from "./subscription";
import user from "./user";
import webhooks from "./webhooks";

const router = express.Router();

router.use("/auth", auth);
router.use("/webhooks", webhooks);
router.use("/user", user);
router.use("/stream", stream);
router.use("/subscription", subscription);

export default router;
