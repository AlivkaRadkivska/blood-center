'use client';
import { ArticleT } from '@/types/article';
import { useEffect, useState } from 'react';

interface NewsContainerProps {
  search: string;
  currentPage: number;
}

export function NewsContainer({ search, currentPage }: NewsContainerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleT[]>();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles?active=true&search=${search}&page=${currentPage}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setArticles(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, currentPage]);

  return (
    <div className="flex flex-col items-center justify-center p-3">
      {loading && <div>Loading...</div>}
      {articles &&
        articles?.length > 0 &&
        articles.map((item) => (
          <div key={item.id.toString()}>
            <p>{item.title}</p>
          </div>
        ))}

      {!loading && (!articles || articles.length === 0) && (
        <p className="my-2 max-w-96 text-center">Статей не знайдено</p>
      )}
    </div>
  );
}
