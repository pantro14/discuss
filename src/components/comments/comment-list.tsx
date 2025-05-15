import CommentShow from "@/components/comments/comment-show";
import { CommmentListItem } from "@/db/queries/comments";

interface CommentListProps {
  fetchComments: () => Promise<CommmentListItem[]>;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ fetchComments }: CommentListProps) {
  const comments = await fetchComments();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
