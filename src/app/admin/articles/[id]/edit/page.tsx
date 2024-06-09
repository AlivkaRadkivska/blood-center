import { ArticleForm } from '@/components/articles/article-form';
import Title from '@/components/ui/title';
import { ArticleT } from '@/types/article';

interface AdminEditArticlePageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditArticlePage({
  params: { id },
}: AdminEditArticlePageProps) {
  const article: ArticleT = await fetch(
    `${process.env.BACKEND_URL}/api/articles/${id}`,
    { cache: 'no-store' }
  ).then((res) => res.json());

  return (
    <>
      <Title>Редагування статті</Title>

      <ArticleForm article={article} />
    </>
  );
}
