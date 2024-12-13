import express from 'express';
import { getAllLike } from '../../controllers/like.controller';

const likeRoute = express();

likeRoute.get('/', getAllLike);

export default likeRoute;
