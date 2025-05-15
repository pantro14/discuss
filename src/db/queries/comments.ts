import type { Comment } from "@prisma/client";
import { cache } from "react";

import { prisma } from "../prisma";

export type CommmentListItem = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentByPostId = cache(
  (postId: string): Promise<CommmentListItem[]> => {
    console.log("fetchCommentByPostId");
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
);
