'use client';
import { LocationT } from '@/types/location';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function LocationsTable({ search }: { search: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationT[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/locations/?search=${search}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setLocations(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      {loading && <div>Завантаження пунктів прийому крові...</div>}

      <table className="text-center w-full divide-y divide-gray border-spacing-2 table-fixed overflow-x-scroll">
        {locations && !loading && locations?.length > 0 && (
          <>
            <thead className="bg-gray-light">
              <tr>
                <th className="w-[30px]">№</th>
                <th>Місто</th>
                <th>Адреса</th>
                <th>Посилання</th>
                <th className="w-1/3">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light">
              {locations.map((item, index) => (
                <tr key={item.id}>
                  <td>{++index}</td>
                  <td>{item.city?.name}</td>
                  <td>{item.address}</td>
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

      {!loading && (!locations || locations.length === 0) && (
        <p className="my-2">В базі даних пунктів прийому крові немає.</p>
      )}
    </>
  );
}