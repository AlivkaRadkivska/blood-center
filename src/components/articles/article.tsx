'use client';
import { ArticleT } from '@/types/article';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Title from '../ui/title';
import { Markup } from 'interweave';
import Loader from '../ui/loader';

export function Article({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<ArticleT>();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/${id}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setArticle(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading && <Loader description="Завантаження статті" />}
      {!loading && article && 'id' in article && (
        <>
          <div className="w-full text-center flex flex-col items-center justify-center">
            <Title>{article.title}</Title>
            <p className="text-xs text-gray-dark">
              від {article.author} |{' '}
              {new Date(article.lastUpdate).toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="w-full md:px-5">
            <Image
              className="rounded w-auto h-auto object-cover m-2 float-right"
              src={article.photo}
              alt="article_image"
              width={250}
              height={220}
            />
            <p className="py-4 italic text-sm">{article.description}</p>
            <Markup content={article.content} noWrap={true} />
          </div>
        </>
      )}
      {!loading && (!article || 'error' in article) && (
        <p className="my-2 max-w-96 text-center">Статті не знайдено.</p>
      )}
    </>
  );
}
