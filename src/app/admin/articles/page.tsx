import { ArticlesTable } from '@/components/articles/articles-table';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import Link from 'next/link';

interface AdminArticlesPageProps {
  searchParams?: {
    search?: string;
  };
}

export default function AdminArticlesPage({
  searchParams,
}: AdminArticlesPageProps) {
  const search = searchParams?.search || '';

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Ключові слова у назві або описі статті" />
        <Button>
          <Link href="/admin/articles/add">Додати статтю</Link>
        </Button>
      </div>

      <ArticlesTable search={search} />
    </>
  );
}
