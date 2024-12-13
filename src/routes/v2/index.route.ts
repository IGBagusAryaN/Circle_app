import express from 'express';
import userRoute from '../v1/users.route';
import authRoute from '../v1/auth.route';
import threadRoute from '../v1/thread.route';
import followRoute from '../v1/follow.route';
import likeRoute from '../v1/like.route';

const router = express();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/thread', threadRoute);
router.use('/follow', followRoute);
router.use('/like', likeRoute);

export default router;
