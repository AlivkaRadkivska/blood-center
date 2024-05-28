import { DeleteDBItem } from '@/components/admin/delete-db-item';
import Title from '@/components/ui/title';

interface AdminDeleteQuestionPageProps {
  params: { id: string };
}

export default function AdminDeleteQuestionPage({
  params,
}: AdminDeleteQuestionPageProps) {
  return (
    <>
      <Title>Видалення потреб у крові</Title>

      <DeleteDBItem id={params.id} table="questions" />
    </>
  );
}
