import { QuestionsTable } from '@/components/questions-n-answers/questions-table';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { getQuestionNumber } from '@/utils/db-helper';

interface AdminQuestionsPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function AdminQuestionsPage({
  searchParams,
}: AdminQuestionsPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const totalPages = await getQuestionNumber(limit, {
    search,
  });

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between mb-3 gap-3">
        <Search placeholder="Ключові слова питання чи відповіді" />
      </div>

      <QuestionsTable search={search} currentPage={currentPage} limit={limit} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
