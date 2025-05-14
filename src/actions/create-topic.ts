"use server";

import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import paths from "@/paths";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Name must be lowercase alphabetic",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormData {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormData,
  formData: FormData
): Promise<CreateTopicFormData> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // validates session
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create topic."],
        },
      };
    }
  }

  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));

  return { errors: {} };
}
