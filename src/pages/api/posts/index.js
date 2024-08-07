import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { content, latitude, longitude, userId } = req.body;
      const post = await prisma.post.create({
        data: {
          content,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          userId: parseInt(userId),
        },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: 'Unable to create post' });
    }
  } else if (req.method === 'GET') {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const skip = (page - 1) * pageSize;

      const posts = await prisma.post.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await prisma.post.count();

      res.status(200).json({
        posts,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      });
    } catch (error) {
      res.status(400).json({ error: 'Unable to fetch posts' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}