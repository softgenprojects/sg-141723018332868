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
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: 'Unable to fetch posts' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}