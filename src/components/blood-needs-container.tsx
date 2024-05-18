'use client';
import { useEffect, useState } from 'react';
import { CityT } from '@/types/city';
import CitySelect from './ui/city-select';
import { AccentButton } from './ui/button';
import Link from 'next/link';

export function BloodNeedsContainer({ cities }: { cities: CityT[] }) {
  const [cityId, setCityId] = useState(cities[0].id);
  const [bloodTypes, setBloodTypes] = useState(['_']);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetch(`/api/blood-needs/${cityId}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setLastUpdate(new Date(res.lastUpdate));
        setBloodTypes(res.bloodTypes);
      });
  }, [cityId]);

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="flex gap-3">
        <CitySelect cities={cities} onChange={setCityId} />

        <AccentButton>
          <Link href={`/locations?cityId=${cityId}`}>
            Перейти до пунктів прийому
          </Link>
        </AccentButton>
      </div>

      {bloodTypes ? (
        <>
          <p className="text-purple flex gap-1 mt-3">
            Наразі дуже потрібні такі групи крові:{' '}
            <span className="text-red font-semibold">
              {bloodTypes.join(', ')}
            </span>
          </p>
          <p className="my-1 text-sm text-gray-dark">
            Останнє оновлення даних: {lastUpdate.toDateString()}
          </p>
        </>
      ) : (
        <p className="my-2 max-w-96 text-center">
          На щастя, в цьому регіоні потреби у крові закриті, проте Ви можете
          здавати кров в будь-який зручний для Вас час.
        </p>
      )}
    </div>
  );
}
