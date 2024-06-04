'use client';
import { useEffect, useState } from 'react';
import { CityT } from '@/types/city';
import CitySelect from '../ui/city-select';
import { Button } from '../ui/button';

interface BloodNeedsContainerProps {
  cities: CityT[];
  handleClosing: () => void;
}

export function BloodNeedsContainer({
  cities,
  handleClosing,
}: BloodNeedsContainerProps) {
  const [cityId, setCityId] = useState(cities[0].id);
  const [bloodNeeds, setBloodNeeds] = useState<{
    bloodTypes?: string[];
    lastUpdate?: Date;
  }>({
    bloodTypes: ['Завантаження...'],
    lastUpdate: new Date(),
  });

  useEffect(() => {
    fetch(`/api/blood-needs?cityId=${cityId}`, {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setBloodNeeds({
          bloodTypes: res ? res.bloodTypes : undefined,
          lastUpdate: res ? new Date(res.lastUpdate) : undefined,
        });
      });
  }, [cityId]);

  return (
    <>
      <div className="flex w-full justify-between">
        <CitySelect cities={cities} onChange={setCityId} />
        <Button>
          <p onClick={handleClosing}>X</p>
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {bloodNeeds.bloodTypes && bloodNeeds.lastUpdate ? (
          <>
            <p className="text-purple flex gap-1 mt-3">
              Наразі потрібні такі групи крові
            </p>
            <p className="text-xs text-gray-dark">
              Останнє оновлення даних:{' '}
              {bloodNeeds.lastUpdate.toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>
            <div className="flex w-full justify-around my-2">
              {bloodNeeds.bloodTypes.map((item) => (
                <p className="text-lg text-red font-semibold" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </>
        ) : (
          <p className="my-2 max-w-80 text-center">
            На щастя, в цьому регіоні термінові потреби у крові закриті.
          </p>
        )}
      </div>
    </>
  );
}
