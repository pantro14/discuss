"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { startTransition, useActionState } from "react";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";

export default function TopicCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

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
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
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
