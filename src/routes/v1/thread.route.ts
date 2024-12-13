import express from 'express';
import {
  createThread,
  deleteThread,
  getAllThread,
} from '../../controllers/thread.controller';
import { authentication } from '../../middlewares/authentication';

const threadRoute = express();

threadRoute.get('/', getAllThread);
threadRoute.post('/', authentication, createThread);
threadRoute.delete('/:id', authentication, deleteThread);

export default threadRoute;
