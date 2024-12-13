import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  deleteUser,
  getAllUser,
  updateUser,
} from '../../controllers/user.controller';

const prisma = new PrismaClient();
const userRoute = express.Router();

userRoute.get('/', getAllUser);
userRoute.put('/:id', updateUser);
userRoute.delete('/delete', deleteUser);

export default userRoute;
