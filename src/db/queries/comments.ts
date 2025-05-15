import type { Comment } from "@prisma/client";

import { prisma } from "../prisma";

export type CommmentListItem = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentByPostId(
  postId: string
): Promise<CommmentListItem[]> {
  return prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
