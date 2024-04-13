import express from 'express';
import { checkUserSubscribesController, createSubscriptionController } from '../controllers/subscription.controller';


const router = express.Router();

router.post('/', createSubscriptionController);
router.get("/:userId/:id", checkUserSubscribesController);

export default router;
