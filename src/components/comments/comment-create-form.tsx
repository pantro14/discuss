"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { useActionState, useEffect, useRef, useState } from "react";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form && (
          <Alert color="danger" title={formState.errors._form.join(", ")} />
        )}

        <FormButton isLoading={isPending}>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
