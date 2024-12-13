import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const SECRET_KEY =
  process.env.SECRET_KEY || 'adade3938eeh3huedaihoaheao83h3ra8oa3hr8a4';

export async function getAllThread(req: Request, res: Response) {
  try {
    const allThreads = await prisma.thread.findMany({
      where: {
        isDeleted: 0,
      },
      select: {
        id: true,
        createdAt: true,
        updateAt: true,
        author: true,
        authorId: true,
        content: true,
      },
    });
    res
      .status(200)
      .json({ message: 'Get all threads succesfully', threads: allThreads });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching all threads', error });
  }
}

export async function createThread(req: Request, res: Response) {
  const { content, authorId } = req.body;

  if (!content || !authorId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newThread = await prisma.thread.create({
      data: {
        content,
        authorId,
      },
    });

    res.status(201).json({ message: 'Thread created', user: newThread });
  } catch (error) {
    res.status(500).json({ message: 'Creating thread user', error });
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

    //soft delete
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
    console.error('Error deleting thread:', error); // Log detail error
    res.status(500).json({ message: 'Error deleting thread', error });
  }
}
