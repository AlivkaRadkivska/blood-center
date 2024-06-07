'use client';
import { CityT } from '@/types/city';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '../ui/loader';

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
      {loading && <Loader description="Завантаження міст" />}

      <div className="w-full overflow-x-auto">
        <table className="text-center w-full divide-y divide-gray border-spacing-2 leading-normal">
          {cities && !loading && cities?.length > 0 && (
            <>
              <thead className="bg-gray-light">
                <tr>
                  <th className="w-[30px]">№</th>
                  <th className="tracking-wider">Назва</th>
                  <th className="tracking-wider">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-ligh">
                {cities.map((item, index) => (
                  <tr key={item.id}>
                    <td>{++index}</td>
                    <td>{item.name}</td>
                    <td className="flex gap-3 justify-center">
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
      </div>

      {!loading && (!cities || cities.length === 0) && (
        <p className="my-2">Міст не знайдено.</p>
      )}
    </>
  );
}
