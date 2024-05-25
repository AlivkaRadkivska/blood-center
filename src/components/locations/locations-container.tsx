'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LocationT } from '@/types/location';

interface LocationsContainerProps {
  city: string;
  search: string;
}

export function LocationsContainer({ city, search }: LocationsContainerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationT[]>();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/locations?cityId=${city}&search=${search}`, {
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
  }, [city, search]);

  return (
    <div className="flex flex-col w-full items-start justify-start">
      {loading && <div>Завантаження пунктів прийому крові...</div>}
      {locations &&
        !loading &&
        locations?.length > 0 &&
        locations.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            target="_blank"
            className="underline underline-offset-2"
          >
            {item.address}
          </Link>
        ))}
      {!loading && (!locations || locations.length === 0) && (
        <p className="my-2">На жаль, пунктів прийому крові не знайдено.</p>
      )}
    </div>
  );
}
