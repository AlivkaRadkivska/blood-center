'use client';
import { BloodNeedsT } from '@/types/blood-needs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BloodNeedsTableProps {
  search: string;
  currentPage: number;
  limit: number;
}

export function BloodNeedsTable({
  search,
  currentPage,
  limit,
}: BloodNeedsTableProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [bloodNeeds, setBloodNeeds] = useState<BloodNeedsT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/blood-needs?search=${search.replace(
        '+',
        '%2B'
      )}&page=${currentPage}&take=${limit}`,
      {
        next: { revalidate: 10 },
      }
    )
      .then(async (res) => await res.json())
      .then((res) => {
        setBloodNeeds(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, currentPage, limit]);

  return (
    <>
      {loading && <div>Завантаження термінових потреб крові...</div>}

      <div className="w-full overflow-x-auto">
        <table className="text-center w-full divide-y divide-gray border-spacing-2 leading-normal">
          {bloodNeeds && !loading && bloodNeeds?.length > 0 && (
            <>
              <thead className="bg-gray-light">
                <tr>
                  <th className="w-[30px]">№</th>
                  <th>Місто</th>
                  <th>Групи крові</th>
                  <th>Останнє оновлення даних</th>
                  <th className="w-1/3">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {bloodNeeds.map((item, index) => (
                  <tr key={item.id}>
                    <td>{++index}</td>
                    <td>{item.city?.name}</td>
                    <td className="text-nowrap">
                      {item.bloodTypes.join(', ')}
                    </td>
                    <td>
                      {new Date(item.lastUpdate).toLocaleDateString('uk-UA', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="flex gap-3 w-full justify-center">
                      <Link
                        href={`/admin/blood-needs/${item.id}/edit`}
                        className="text-purple m-2 hover:underline"
                      >
                        Редагувати
                      </Link>
                      <Link
                        href={`/admin/blood-needs/${item.id}/delete`}
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

      {!loading && (!bloodNeeds || bloodNeeds.length === 0) && (
        <p className="my-2">Термінових потреб крові не знайдено.</p>
      )}
    </>
  );
}
