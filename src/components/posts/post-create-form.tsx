"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { startTransition, useActionState } from "react";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              placeholder="Title"
              labelPlacement="outside"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content of the post"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form && (
              <Alert color="danger" title={formState.errors._form.join(", ")} />
            )}
            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
