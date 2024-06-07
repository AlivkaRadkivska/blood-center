import { Article } from '@/components/articles/article';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-20">
      <Article id={params.id} />
    </div>
  );
}
