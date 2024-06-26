'use client';
import { QuestionT } from '@/types/question';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '../ui/loader';

interface QuestionTableProps {
  search: string;
  currentPage: number;
  limit: number;
}

export function QuestionsTable({
  search,
  currentPage,
  limit,
}: QuestionTableProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/questions/?search=${search}&page=${currentPage}&take=${limit}`,
      {
        next: { revalidate: 10 },
      }
    )
      .then(async (res) => await res.json())
      .then((res) => {
        setQuestions(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, currentPage, limit]);

  return (
    <>
      {loading && <Loader description="Завантаження питань" />}

      <div className="w-full overflow-x-auto">
        <table className="text-center w-full divide-y divide-gray border-spacing-2 leading-normal">
          {questions && !loading && questions?.length > 0 && (
            <>
              <thead className="bg-gray-light">
                <tr>
                  <th className="w-[30px]">№</th>
                  <th>Автор питання</th>
                  <th>Питання</th>
                  <th>Відповідь</th>
                  <th>Активність</th>
                  <th className="w-1/3">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {questions.map((item, index) => (
                  <tr key={item.id}>
                    <td>{++index}</td>
                    <td>{item.email}</td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td
                      className={
                        item.active
                          ? 'text-2xl text-green'
                          : 'text-2xl text-red'
                      }
                    >
                      {item.active ? '+' : '-'}
                    </td>
                    <td className="flex gap-3 w-full justify-center">
                      <Link
                        href={`/admin/questions/${item.id}/edit`}
                        className="text-purple m-2 hover:underline"
                      >
                        Редагувати
                      </Link>
                      <Link
                        href={`/admin/questions/${item.id}/delete`}
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

      {!loading && (!questions || questions.length === 0) && (
        <p className="my-2">Питань не знайдено.</p>
      )}
    </>
  );
}
