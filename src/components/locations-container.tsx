'use client';
import { useEffect, useState } from 'react';
import { CityT } from '@/types/city';
import CitySelect from './ui/city-select';
import Link from 'next/link';
import { DonationLocationT } from '@/types/donation-location';

export function LocationsContainer({ cities }: { cities: CityT[] }) {
  const [cityId, setCityId] = useState(cities[0].id);
  const [locations, setLocations] = useState<DonationLocationT[]>();

  useEffect(() => {
    fetch(`/api/locations?cityId=${cityId}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setLocations(res);
      });
  }, [cityId]);

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="flex gap-3">
        <CitySelect cities={cities} onChange={setCityId} />
      </div>

      {locations && locations?.length > 0 ? (
        <>
          {locations.map((item) => (
            <Link
              key={item.id.toString()}
              href={item.url.toString()}
              target="_blank"
              className="underline underline-offset-2"
            >
              {item.address}
            </Link>
          ))}
        </>
      ) : (
        <p className="my-2 max-w-96 text-center">
          На жаль, в цьому регіоні пунктів прийому крові немає.
        </p>
      )}
    </div>
  );
}
