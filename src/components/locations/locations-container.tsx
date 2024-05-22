'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DonationLocationT } from '@/types/donation-location';

interface LocationsContainerProps {
  region: string;
  search: string;
}

export function LocationsContainer({
  region,
  search,
}: LocationsContainerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<DonationLocationT[]>();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/locations?cityId=${region}&search=${search}`, {
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
  }, [region, search]);

  return (
    <div className="flex flex-col w-full items-start justify-start">
      {loading && <div>Завантаження пунктів прийому крові...</div>}
      {locations &&
        !loading &&
        locations?.length > 0 &&
        locations.map((item) => (
          <Link
            key={item.id.toString()}
            href={item.url.toString()}
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
