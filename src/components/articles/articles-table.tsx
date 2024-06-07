'use client';
import { ArticleT } from '@/types/article';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ArticlesTableProps {
  search: string;
  currentPage: number;
  limit: number;
}

export function ArticlesTable({
  search,
  currentPage,
  limit,
}: ArticlesTableProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/?search=${search}&page=${currentPage}&take=${limit}`, {
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
  }, [search, currentPage, limit]);

  return (
    <>
      {loading && <div>Завантаження статей...</div>}

      <div className="w-full overflow-x-auto">
        <table className="text-center w-full divide-y divide-gray border-spacing-2 leading-normal">
          {articles && !loading && articles?.length > 0 && (
            <>
              <thead className="bg-gray-light">
                <tr>
                  <th className="w-[30px]">№</th>
                  <th>Фото</th>
                  <th>Заголовок</th>
                  <th>Автор</th>
                  <th>Опис</th>
                  <th>Контент</th>
                  <th>Дата останньої зміни</th>
                  <th>Активність</th>
                  <th className="w-max">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {articles.map((item, index) => (
                  <tr key={item.id}>
                    <td>{++index}</td>
                    <td>
                      <Image
                        className="border-2 rounded border-purple ease-in-out"
                        src={item.photo}
                        alt="article_image"
                        width={70}
                        height={50}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.description.slice(1, 50) + '...'}</td>
                    <td>...</td>
                    <td>
                      {new Date(item.lastUpdate).toLocaleDateString('uk-UA', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td
                      className={
                        item.active
                          ? 'text-2xl text-green'
                          : 'text-2xl text-red'
                      }
                    >
                      {item.active ? '+' : '-'}
                    </td>
                    <td className="flex gap-3 w-full justify-center items-center h-full">
                      <Link
                        href={`/admin/articles/${item.id}/edit`}
                        className="text-purple m-2 hover:underline"
                      >
                        Редагувати
                      </Link>
                      <Link
                        href={`/admin/articles/${item.id}/delete`}
                        className="text-red m-2 hover:underline"
                      >
                        Видалити
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>

      {!loading && (!articles || articles.length === 0) && (
        <p className="my-2">Статей не знайдено.</p>
      )}
    </>
  );
}
