import express from 'express';
import {
  followUser,
  getAllFollow,
  unfollowUser,
} from '../../controllers/follow.controller';
import { authentication } from '../../middlewares/authentication';

const followRoute = express();

followRoute.get('/', getAllFollow);
followRoute.post('/follow', authentication, followUser);
followRoute.post('/unfollow', authentication, unfollowUser);

export default followRoute;
