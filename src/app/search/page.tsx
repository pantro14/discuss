import { redirect } from 'next/navigation';

import PostList from '@/components/posts/post-list';
import { fetchPostBySearchTerm } from '@/db/queries/post';
import paths from '@/paths';

interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;
  if (!term) {
    redirect(paths.home());
  }
  return (
    <div>
      <PostList fetchPosts={() => fetchPostBySearchTerm(term)} />
    </div>
  );
}
