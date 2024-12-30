import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getRepliesThread(req: Request, res: Response) {
  const allReply = await prisma.reply.findMany();
  res.json(allReply);
}

export async function createReply(req: Request, res: Response) {
  const { content } = req.body;
  const threadId = parseInt(req.params.id);
  const { id: authorId } = (req as any).user;

  try {
    const reply = await prisma.reply.create({
      data: {
        threadId: Number(threadId),
        content,
        authorId: authorId,
      },
    });

    res.status(200).json({ message: 'Create reply succesfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reply' });
  }
}

export async function updateReplies(req: Request, res: Response) {
  const threadId = parseInt(req.params.id);
  const { content } = req.body;
  const { id: userId } = (req as any).user;

  try {
    const existingReplay = await prisma.reply.findUnique({
      where: {
        id: Number(threadId),
      },
    });

    if (!existingReplay) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (existingReplay!.authorId !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to update this reply' });
    }

    const updateReply = await prisma.reply.update({
      where: { id: Number(threadId) },
      data: {
        content,
      },
    });

    res
      .status(200)
      .json({ message: 'Reply updated successfully', reply: updateReply });
  } catch (error) {
    res.status(500).json({ message: 'Failed update reply' });
  }
}

export async function deleteReplies(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.reply.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: 'Reply deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete reply' });
  }
}
