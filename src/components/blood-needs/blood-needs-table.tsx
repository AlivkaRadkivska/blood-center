'use client';
import { BloodNeedsT } from '@/types/blood-needs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function BloodNeedsTable({ search }: { search: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [bloodNeeds, setBloodNeeds] = useState<BloodNeedsT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blood-needs?search=${search.replace('+', '%2B')}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setBloodNeeds(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      {loading && <div>Завантаження термінових потреб крові...</div>}

      <table className="text-center w-full divide-y divide-gray border-spacing-2 table-fixed overflow-x-scroll">
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
                  <td>{item.bloodTypes.join(', ')}</td>
                  <td>{new Date(item.lastUpdate).toDateString()}</td>
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

      {!loading && (!bloodNeeds || bloodNeeds.length === 0) && (
        <p className="my-2">Термінових потреб крові не знайдено.</p>
      )}
    </>
  );
}
