import type { Post } from '@prisma/client';

import { prisma } from '../prisma';

export type PostListItem = Post & {
  topic: { slug: string };
  user: { name: string | null; image?: string | null };
  _count: { comments: number };
};

export function fetchPostsByTopicSlug(slug: string): Promise<PostListItem[]> {
  return prisma.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopPost(): Promise<PostListItem[]> {
  return prisma.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc',
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}

export function fetchPostBySearchTerm(term: string): Promise<PostListItem[]> {
  return prisma.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
  });
}
