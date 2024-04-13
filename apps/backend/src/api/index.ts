import express from 'express';
import auth from './auth';
import webhooks from './webhooks';


const router = express.Router();

router.use('/auth', auth);
router.use('/webhooks', webhooks);

export default router;
