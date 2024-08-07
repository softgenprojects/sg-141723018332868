import { PrismaClient } from '@prisma/client';
import { logError } from '@/utils/errorLogging';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log('API route handler called');
  console.log('Environment variables:', process.env);

  try {
    await prisma.$connect();
    console.log('Database connected successfully');

    if (req.method === 'POST') {
      console.log('Received POST request:', req.body);
      const { content, latitude, longitude, userId } = req.body;
      const post = await prisma.post.create({
        data: {
          content,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          userId: parseInt(userId),
        },
      });
      console.log('Post created:', post);
      res.status(201).json(post);
    } else if (req.method === 'GET') {
      console.log('Received GET request:', req.query);
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

      console.log(`Retrieved ${posts.length} posts`);
      res.status(200).json({
        posts,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      });
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    logError('API Error:', error);
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
}