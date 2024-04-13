import express from 'express';
import auth from './auth';
import webhooks from './webhooks';
import user from './user';
import stream from './stream';


const router = express.Router();

router.use('/auth', auth);
router.use('/webhooks', webhooks);
router.use('/user', user);
router.use('/stream', stream);

export default router;
