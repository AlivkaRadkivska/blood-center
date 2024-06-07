'use client';
import { ArticleT } from '@/types/article';
import { useEffect, useState } from 'react';
import { MiniArticle } from './mini-article';
import Loader from '../ui/loader';

interface ArticlesContainerProps {
  search: string;
  currentPage: number;
  limit: number;
}

export function ArticlesContainer({
  search,
  currentPage,
  limit,
}: ArticlesContainerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleT[]>();

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/articles?active=true&search=${search}&page=${currentPage}&take=${limit}`,
      {
        next: { revalidate: 10 },
      }
    )
      .then(async (res) => await res.json())
      .then((res) => {
        setArticles(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, currentPage, limit]);

  return (
    <div className="flex flex-col items-center justify-center p-3 w-full max-w-[1000px]">
      {loading && <Loader description="Завантаження статей" />}
      {articles &&
        articles?.length > 0 &&
        articles.map((item) => <MiniArticle key={item.id} article={item} />)}

      {!loading && (!articles || articles.length === 0) && (
        <p className="my-2 max-w-96 text-center">Статей не знайдено.</p>
      )}
    </div>
  );
}
