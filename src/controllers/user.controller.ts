import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUser(req: Request, res: Response) {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      password: true,
      fullname: true,
      username: true,
      followers: true,
      following: true,
    },
  });
  res.json(allUsers);
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }

    const updatedData: any = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;

    if (username || email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username: username || undefined },
            { email: email || undefined },
          ],
          NOT: { id: Number(id) },
        },
      });
      if (existingUser) {
        return res.status(400).json({
          message: 'Email or username already in use',
        });
      }
    }
    const updateUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
    });
    res.status(200).json({
      message: 'Update user successfully',
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
}

export async function deleteUser(req: Request, res: Response) {}
