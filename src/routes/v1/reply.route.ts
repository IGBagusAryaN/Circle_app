import express from 'express';
import { authentication } from '../../middlewares/authentication';
import {
  createReply,
  deleteReplies,
  // getRepliesCountByThread,
  getRepliesThread,
  getReplyCount,
  updateReplies,
} from '../../controllers/reply.controller';
import { upload } from '../../middlewares/upload-file';

const replyRouter = express();

replyRouter.get('/:threadId', authentication, getRepliesThread);
replyRouter.post(
  '/:id',
  authentication,
  upload('single', 'image'),
  createReply,
);
replyRouter.put('/:id', authentication, updateReplies);
replyRouter.delete('/:id', authentication, deleteReplies);
replyRouter.get('/count/:id', authentication, getReplyCount);

export default replyRouter;
