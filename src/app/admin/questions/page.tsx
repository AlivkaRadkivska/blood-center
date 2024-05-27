import { QuestionsTable } from '@/components/questions-n-answers/questions-table';
import Search from '@/components/ui/search';

interface AdminQuestionsPageProps {
  searchParams?: {
    search?: string;
  };
}

export default async function AdminQuestionsPage({
  searchParams,
}: AdminQuestionsPageProps) {
  const search = searchParams?.search || '';

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Ключові слова питання чи відповіді" />
      </div>

      <QuestionsTable search={search} />
    </>
  );
}
