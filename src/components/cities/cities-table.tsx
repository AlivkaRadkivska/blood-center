'use client';
import { CityT } from '@/types/city';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CitiesTableProps {
  search: string;
  currentPage: number;
  limit: number;
}

export function CitiesTable({ search, currentPage, limit }: CitiesTableProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<CityT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cities/?search=${search}&page=${currentPage}&take=${limit}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setCities(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, currentPage, limit]);

  return (
    <>
      {loading && <div>Завантаження міст...</div>}

      <table className="text-center w-full divide-y divide-gray border-spacing-2 table-fixed overflow-x-scroll">
        {cities && !loading && cities?.length > 0 && (
          <>
            <thead className="bg-gray-light">
              <tr>
                <th className="w-[30px]">№</th>
                <th>Назва</th>
                <th className="w-1/3">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light">
              {cities.map((item, index) => (
                <tr key={item.id}>
                  <td>{++index}</td>
                  <td>{item.name}</td>
                  <td className="flex gap-3 w-full justify-center">
                    <Link
                      href={`/admin/cities/${item.id}/edit`}
                      className="text-purple m-2 hover:underline"
                    >
                      Редагувати
                    </Link>
                    <Link
                      href={`/admin/cities/${item.id}/delete`}
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

      {!loading && (!cities || cities.length === 0) && (
        <p className="my-2">Міст не знайдено.</p>
      )}
    </>
  );
}
