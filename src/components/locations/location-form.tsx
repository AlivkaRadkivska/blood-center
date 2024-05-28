'use client';
import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { useRouter } from 'next/navigation';
import { LocationT } from '@/types/location';
import CitySelect from '../ui/city-select';
import { CityT } from '@/types/city';

interface LocationFormProps {
  cities: CityT[];
  location?: LocationT;
}

export function LocationForm({ cities, location }: LocationFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [cityId, setCityId] = useState(location ? location.cityId : undefined);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const response = await fetch(
      `/api/locations${location ? '/' + location.id : ''}`,
      {
        method: location ? 'PATCH' : 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if ('id' in data) router.push('/admin/locations');
    if ('error' in data) setError(data.error);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 w-full max-w-[600px]"
      >
        <label>
          Місто*:{' '}
          <CitySelect cities={cities} onChange={setCityId} value={cityId} />
        </label>
        <Input
          type="text"
          name="address"
          label="Адреса*:"
          placeholder="Вул. Здоров'я, 2"
          required={true}
          value={location ? location.address : undefined}
        />
        <Input
          type="text"
          name="url"
          label="Посилання*:"
          placeholder="https://google.maps"
          required={true}
          value={location ? location.url : undefined}
        />

        <p className="text-sm text-red">
          *Обов&apos;язкове поле для заповнення
        </p>
        {error && <p className="text-sm text-red">{error}</p>}
        <Button>
          <input type="submit" name="submit" value="Надіслати" />
        </Button>
      </form>
    </>
  );
}
