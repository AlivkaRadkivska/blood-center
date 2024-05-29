import { ArticlesContainer } from '@components/articles/articles-container';
import Search from '@/components/ui/search';
import Title from '@/components/ui/title';
import Pagination from '@/components/ui/pagination';
import { getDBRowsNumber } from '@/utils/db-helper';

interface NewsPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getDBRowsNumber(
    'articles',
    {
      active: true,
      OR: [
        {
          title: { contains: search ? search : '', mode: 'insensitive' },
        },
        {
          content: { contains: search ? search : '', mode: 'insensitive' },
        },
      ],
    },
    5
  );

  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <Title>
        <h1>Новини в світі донорства крові</h1>
      </Title>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Знайти за заголовком" />
      </div>

      <ArticlesContainer search={search} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={typeof totalPages === 'number' ? totalPages : 1}
        />
      </div>
    </div>
  );
}
