import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSuggestedUsers = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing' });
  }

  try {
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);

    const suggestedUsers = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } }, // user yang login
          { id: { notIn: followingIds } },
        ],
      },
      include: {
        profile: true,
        _count: {
          select: { followers: true },
        },
      },
      orderBy: {
        followers: {
          _count: 'desc', // Urutkan berdasarkan jumlah followers, dari yang terbanyak
        },
      },
      take: 5,
    });

    return res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    return res.status(500).json({ message: 'Failed to fetch suggested users' });
  }
};
