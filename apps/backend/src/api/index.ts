import express from 'express';
import auth from './auth';
import webhooks from './webhooks';
import user from './user';


const router = express.Router();

router.use('/auth', auth);
router.use('/webhooks', webhooks);
router.use('/user', user);

export default router;
