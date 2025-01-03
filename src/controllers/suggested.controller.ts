import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSuggestedUsers = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = res.locals.userId;
    console.log('Logged In User ID:', loggedInUserId);

    // Ambil daftar suggested users dari database
    const suggestedUsers = await prisma.user.findMany({
      where: {
        id: {
          not: loggedInUserId, // Bukan pengguna yang login
        },
        followers: {
          none: {
            followingId: loggedInUserId, // Pastikan pengguna ini belum mengikuti akun yang login
          },
        },
      },
      include: {
        followers: {
          where: { followingId: loggedInUserId },
          select: {
            followerId: true,
          },
        },
        profile: true,
      },
    });

    // Enrich user data with isFollowingUs flag and follower count
    const enrichedUsers = suggestedUsers.map((user) => {
      const isFollowingUs = user.followers.some(
        (follow) => follow.followerId === loggedInUserId,
      );
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        isFollowingUs,
        fullname: user.profile?.[0]?.fullname || 'Unknown User',
        followerCount: user.followers.length || 0, // Tambahkan jumlah follower
        profileImage: user.profile?.[0]?.profileImage || 'default-image-url', // Fallback jika tidak ada profil
      };
    });

    // Prioritize users who follow us first, then by follower count
    const sortedUsers = enrichedUsers
      .filter((user) => user.id !== loggedInUserId) // Filter out the logged-in user if any
      .sort((a, b) => {
        // Prioritize users who follow us
        if (a.isFollowingUs && !b.isFollowingUs) return -1;
        if (!a.isFollowingUs && b.isFollowingUs) return 1;

        // If both are following us or neither, sort by follower count
        return b.followerCount - a.followerCount;
      });

    return res.status(200).json(sortedUsers);
  } catch (error) {
    const err = error as unknown as Error;

    return res.status(500).json({
      message: err.message,
    });
  }
};
