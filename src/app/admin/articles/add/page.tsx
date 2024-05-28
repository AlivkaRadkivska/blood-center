import { ArticleForm } from '@/components/articles/article-form';
import Title from '@/components/ui/title';

export default async function AdminAddArticlePage() {
  return (
    <>
      <Title>Додавання статті</Title>

      <ArticleForm />
    </>
  );
}
