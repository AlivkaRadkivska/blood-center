import { DeleteDBItem } from '@/components/admin/delete-db-item';
import Title from '@/components/ui/title';

interface AdminDeleteArticlePageProps {
  params: { id: string };
}

export default function AdminDeleteArticlePage({
  params,
}: AdminDeleteArticlePageProps) {
  return (
    <>
      <Title>Видалення статті</Title>

      <DeleteDBItem id={params.id} table="articles" />
    </>
  );
}
