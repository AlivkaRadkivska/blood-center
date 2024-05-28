'use client';
import { useEffect, useState } from 'react';
import { CityT } from '@/types/city';
import { BloodNeedsContainer } from './blood-needs-container';

export default function BloodNeedsModal() {
  const [cities, setCities] = useState<CityT[]>([]);
  const [ActiveModal, setActiveModal] = useState(false);

  useEffect(() => {
    fetch('/api/cities', {
      next: { revalidate: 10 },
    })
      .then(async (res) => await res.json())
      .then((res) => {
        setCities(res);
      });
  }, []);

  return (
    <>
      <div className="fixed bottom-14 left-10 z-50 shadow-xl">
        <div
          className="border-2 border-white rounded-full bg-purple hover:bg-red text-white px-4 py-1 cursor-pointer shadow-lg"
          onClick={() => {
            setActiveModal((prev) => !prev);
          }}
        >
          {ActiveModal ? (
            <p>Термінові потреби в крові</p>
          ) : (
            <p className="text-xl">!</p>
          )}
        </div>
      </div>

      {ActiveModal && (
        <dialog className="fixed bottom-24 left-8 bg-white z-40 m-0 flex flex-col justify-center items-center rounded-lg p-3 shadow-xl">
          {cities.length > 0 ? (
            <BloodNeedsContainer
              cities={cities}
              handleClosing={() => {
                setActiveModal(false);
              }}
            />
          ) : (
            <p>Завантаження даних...</p>
          )}
        </dialog>
      )}
    </>
  );
}
