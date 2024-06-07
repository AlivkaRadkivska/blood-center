import { ArticlesContainer } from '@components/articles/articles-container';
import Search from '@/components/ui/search';
import Title from '@/components/ui/title';
import Pagination from '@/components/ui/pagination';
import { getArticleNumber } from '@/utils/db-helper';

interface NewsPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 5;
  const totalPages = await getArticleNumber(limit, {
    active: true,
    search,
  });

  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-center pt-20">
        <Title>
          <h1>Новини в світі донорства крові</h1>
        </Title>

        <div className="mt-4 flex items-center justify-start gap-2 md:mt-8 w-full sm:pl-5">
          <Search placeholder="Знайти за ключовими словами" />
        </div>

        <ArticlesContainer
          search={search}
          currentPage={currentPage}
          limit={limit}
        />
      </section>
      <Pagination totalPages={totalPages} />
    </>
  );
}
