'use client';
import { useEffect, useState } from 'react';
import { LocationT } from '@/types/location';
import Location from './location';
import Loader from '../ui/loader';

interface LocationsContainerProps {
  city: string;
  search: string;
  currentPage: number;
  limit: number;
}

export function LocationsContainer({
  city,
  search,
  currentPage,
  limit,
}: LocationsContainerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [locations, setLocations] = useState<LocationT[]>();

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/locations?cityId=${city}&search=${search}&page=${currentPage}&take=${limit}`,
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
  }, [city, search, currentPage, limit]);

  return (
    <div className="flex flex-col w-full items-start justify-start border-t-2 border-purple sm:border-none">
      {loading && <Loader description="Завантаження пунктів прийому крові" />}
      {locations &&
        !loading &&
        locations?.length > 0 &&
        locations.map((item, index) => (
          <Location index={index + 1} location={item} key={item.id} />
        ))}
      {!loading && (!locations || locations.length === 0) && (
        <p className="my-2">На жаль, пунктів прийому крові не знайдено.</p>
      )}
    </div>
  );
}
