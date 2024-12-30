import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const SECRET_KEY =
  process.env.SECRET_KEY || 'adade3938eeh3huedaihoaheao83h3ra8oa3hr8a4';
export async function getAllThread(req: Request, res: Response) {
  try {
    const user = (req as any).user || null;
    const filterByUser = req.query.filterByUser === 'true';
    const userId = parseInt(req.query.userId as string, 10);

    const threads = await prisma.thread.findMany({
      where: {
        isDeleted: 0,
        ...(filterByUser && userId && { authorId: userId }),
      },
      include: {
        profile: { select: { id: true, fullname: true, profileImage: true } },
        author: { select: { id: true, username: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ message: 'Get threads successfully', threads });
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ message: 'Error fetching threads', error });
  }
}

export async function createThread(req: Request, res: Response) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const { id: authorId } = (req as any).user;

    const user = await prisma.user.findUnique({
      where: { id: authorId },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profile[0];
    if (!profile) {
      return res.status(400).json({ message: 'User does not have a profile' });
    }

    const file = req.file?.path || null;

    const newThread = await prisma.thread.create({
      data: {
        content,
        authorId,
        profileId: profile.id,
        image: file,
      },
    });

    return res.status(201).json({
      message: 'Thread created successfully',
      thread: newThread,
    });
  } catch (error) {
    console.error('Error creating thread:', error);
    return res.status(500).json({ message: 'Error creating thread', error });
  }
}

export async function updateThread(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);
  const { content } = req.body;
  const file = req.file?.path;

  try {
    const existingThread = await prisma.thread.findUnique({
      where: { id: Number(threadId) },
    });

    if (!existingThread) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    if (existingThread.authorId !== Number((req as any).user.id)) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this thread' });
    }

    const updateThread = await prisma.thread.update({
      where: { id: Number(threadId) },
      data: {
        content,
        image: file,
      },
    });

    res.status(200).json({ message: 'Succesfully update thread' });
  } catch (error) {
    res.status(500).json({ message: 'Failed update thread' });
  }
}

export async function deleteThread(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);

  try {
    const threadExist = await prisma.thread.findUnique({
      where: { id: threadId },
    });

    if (!threadExist) {
      return res.status(404).json({ message: 'Thread not found' });
    }

    if (threadExist.authorId !== (req as any).user.id) {
      return res
        .status(401)
        .json({ message: 'User not granted to delete this thread' });
    }

    if (threadExist.isDeleted === 1) {
      return res.status(400).json({ message: 'Thread is already deleted' });
    }

    await prisma.thread.update({
      where: {
        id: threadId,
      },
      data: {
        isDeleted: 1,
      },
    });

    res.status(200).json({ message: 'thread deleted succesfully' });
  } catch (error) {
    console.error('Error deleting thread:', error);
    res.status(500).json({ message: 'Error deleting thread', error });
  }
}
