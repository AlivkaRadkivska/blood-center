import { ArticlesTable } from '@/components/articles/articles-table';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { getArticleNumber } from '@/utils/db-helper';
import Link from 'next/link';

interface AdminArticlesPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function AdminArticlesPage({
  searchParams,
}: AdminArticlesPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const totalPages = await getArticleNumber(limit, {
    search,
  });

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Ключові слова у назві або описі статті" />
        <Button>
          <Link href="/admin/articles/add">Додати статтю</Link>
        </Button>
      </div>
      <ArticlesTable search={search} currentPage={currentPage} limit={limit} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
