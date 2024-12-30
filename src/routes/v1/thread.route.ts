import express from 'express';
import {
  createThread,
  deleteThread,
  getAllThread,
  updateThread,
} from '../../controllers/thread.controller';
import { authentication } from '../../middlewares/authentication';
import { upload } from '../../middlewares/upload-file';

const threadRoute = express();

threadRoute.get('/', getAllThread);
threadRoute.put(
  '/:id',
  authentication,
  upload('single', 'image'),
  updateThread,
);
threadRoute.post('/', authentication, upload('single', 'image'), createThread);
threadRoute.delete('/:id', authentication, deleteThread);

export default threadRoute;
