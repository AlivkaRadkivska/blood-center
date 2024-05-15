import { NewsContainer } from '@/components/news-container';
import Search from '@/components/search';
import Title from '@/components/ui/title';
import Pagination from '@/components/pagination';
import { db } from '@db/index';
import { getArticlesNumber } from '@/utils/db-helper';

interface NewsPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getArticlesNumber(true, search);

  return (
    <>
      <Title text="Новини в світі донорства крові" />

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Знайти за назвою" />
      </div>

      <NewsContainer search={search} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
