import express from 'express';
import { authentication } from '../../middlewares/authentication';
import {
  createReply,
  deleteReplies,
  getRepliesThread,
  updateReplies,
} from '../../controllers/reply.controller';

const replyRouter = express();

replyRouter.get('/', getRepliesThread);
replyRouter.post('/:id', authentication, createReply);
replyRouter.put('/:id', authentication, updateReplies);
replyRouter.delete('/:id', authentication, deleteReplies);

export default replyRouter;
