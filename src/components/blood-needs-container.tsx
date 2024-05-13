'use client';
import { Suspense, useEffect, useState } from 'react';
import { Cormorant_Infant } from 'next/font/google';
import { CityT } from '@/types/city';
import CitySelect from './ui/city-select';
import { AccentButton, Button } from './ui/button';
import Link from 'next/link';

const accentFont = Cormorant_Infant({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
});

export function BloodNeedsContainer({ cities }: { cities: CityT[] }) {
  const [cityId, setCityId] = useState(cities[0].id);
  const [bloodTypes, setBloodTypes] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetch(`/api/blood-needs/${cityId}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
        setLastUpdate(new Date(res.lastUpdate));
        setBloodTypes(res.bloodTypes);
      });
    console.log(cityId);
  }, [cityId]);

  return (
    <div className="flex flex-col items-center justify-center p-3">
      <Suspense fallback={<p>Завантаження...</p>}>
        <CitySelect cities={cities} onChange={setCityId} />

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

        <AccentButton>
          <Link href={`/locations?cityId=${cityId}`}>
            Перейти до пунктів прийому
          </Link>
        </AccentButton>
      </Suspense>
    </div>
  );
}
