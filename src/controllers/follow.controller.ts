import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllFollow(req: Request, res: Response) {
  const allFollow = await prisma.follow.findMany();
  res.json(allFollow);
}

export async function followUser(req: Request, res: Response) {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    res
      .status(400)
      .json({ message: ' Both followerId and followingId are required' });
  }

  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow && existingFollow.isDeleted === 1) {
      await prisma.follow.update({
        where: { id: existingFollow.id },
        data: {
          isDeleted: 0,
          deletedAt: null,
        },
      });

      return res.status(200).json({ message: 'Follow relationship restored' });
    }

    if (!existingFollow) {
      await prisma.follow.create({
        data: {
          followerId,
          followingId,
        },
      });

      return res.status(201).json({ message: 'Followed successfully.' });
    }

    return res.status(200).json({ message: 'Already following.' });
  } catch (error) {
    res.status(500).json({ message: 'Error following user', error });
  }
}

export async function unfollowUser(req: Request, res: Response) {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res
      .status(400)
      .json({ message: 'Both followerId and followingId are required' });
  }

  try {
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    // jika follow gaada atau sudah softdelete
    if (!existingFollow || existingFollow.isDeleted === 1) {
      return res.status(404).json({ message: 'Follow relationship not found' });
    }

    await prisma.follow.update({
      where: { id: existingFollow!.id },
      data: {
        isDeleted: 1,
        deletedAt: new Date(),
      },
    });

    return res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error unfollowing user', error });
  }
}
