import { Chip } from "@heroui/chip";
import { Topic } from "@prisma/client";
import Link from "next/link";

import { prisma } from "@/db/prisma";
import paths from "@/paths";

export default async function TopicList() {
  const topics: Topic[] = await prisma.topic.findMany();

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="shadow">
            {topic.slug}{" "}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{renderedTopics}</div>;
}
