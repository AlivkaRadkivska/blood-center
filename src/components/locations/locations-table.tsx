'use client';
import { LocationT } from '@/types/location';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from '../ui/loader';

interface LocationsTableProps {
  search: string;
  currentPage: number;
  limit: number;
}

export function LocationsTable({
  search,
  currentPage,
  limit,
}: LocationsTableProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/locations/?search=${search}&page=${currentPage}&take=${limit}`,
      {
        next: { revalidate: 10 },
      }
    )
      .then(async (res) => await res.json())
      .then((res) => {
        setLocations(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search, currentPage, limit]);

  return (
    <>
      {loading && <Loader description="Завантаження пунктів прийому крові" />}

      <div className="w-full overflow-x-auto">
        <table className="text-center w-full divide-y divide-gray border-spacing-2 leading-normal">
          {locations && !loading && locations?.length > 0 && (
            <>
              <thead className="bg-gray-light">
                <tr>
                  <th className="w-[30px]">№</th>
                  <th>Місто</th>
                  <th>Заклад</th>
                  <th>Адреса</th>
                  <th>Телефон</th>
                  <th>Робочий час</th>
                  <th>Посилання</th>
                  <th className="w-1/3">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-light">
                {locations.map((item, index) => (
                  <tr key={item.id}>
                    <td>{++index}</td>
                    <td>{item.city?.name}</td>
                    <td>{item.institution}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.openedAt}</td>
                    <td>{item.url}</td>
                    <td className="flex gap-3 w-full justify-center">
                      <Link
                        href={`/admin/locations/${item.id}/edit`}
                        className="text-purple m-2 hover:underline"
                      >
                        Редагувати
                      </Link>
                      <Link
                        href={`/admin/locations/${item.id}/delete`}
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

      {!loading && (!locations || locations.length === 0) && (
        <p className="my-2">Пунктів прийому крові не знайдено.</p>
      )}
    </>
  );
}
