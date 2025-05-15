import { Skeleton } from "@heroui/skeleton";

export default function PostShowSkeleton() {
  return (
    <div className="m-4">
      <div className="my-2">
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}
