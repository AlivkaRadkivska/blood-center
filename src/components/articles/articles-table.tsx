'use client';
import { ArticleT } from '@/types/article';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function ArticlesTable({ search }: { search: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<ArticleT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles/?search=${search}`, {
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
  }, [search]);

  return (
    <>
      {loading && <div>Завантаження статей...</div>}

      <table className="text-center w-full divide-y divide-gray border-spacing-2 table-fixed overflow-x-scroll">
        {articles && !loading && articles?.length > 0 && (
          <>
            <thead className="bg-gray-light">
              <tr>
                <th className="w-[30px]">№</th>
                <th>Фото</th>
                <th>Заголовок</th>
                <th>Опис</th>
                {/* <th>Автор</th> */}
                {/* <th>Дата створення</th> */}
                <th>Активність</th>
                <th className="w-1/3">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light">
              {articles.map((item, index) => (
                <tr key={item.id}>
                  <td>{++index}</td>
                  <td>
                    <Image
                      className="border-2 rounded border-purple ease-in-out"
                      src={`/uploads/articles/${item.photo}`}
                      alt="article_image"
                      width={70}
                      height={50}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>...</td>
                  {/* <td>{item.description}</td> */}
                  {/* <td>{item.author}</td> */}
                  {/* <td>{item.date}</td> */}
                  <td
                    className={
                      item.active ? 'text-2xl text-green' : 'text-2xl text-red'
                    }
                  >
                    {item.active ? '+' : '-'}
                  </td>
                  <td className="flex gap-3 w-full justify-center">
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

      {!loading && (!articles || articles.length === 0) && (
        <p className="my-2">Статей не знайдено.</p>
      )}
    </>
  );
}
