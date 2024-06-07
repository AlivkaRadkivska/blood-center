'use client';
import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { useRouter } from 'next/navigation';
import CitySelect from '../cities/city-select';
import { CityT } from '@/types/city';
import { BloodNeedsT } from '@/types/blood-needs';

interface BloodNeedsFormProps {
  cities: CityT[];
  bloodNeeds?: BloodNeedsT;
}

export function BloodNeedsForm({ cities, bloodNeeds }: BloodNeedsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>();
  const [cityId, setCityId] = useState(
    bloodNeeds ? bloodNeeds.cityId : undefined
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const response = await fetch(
      `/api/blood-needs${bloodNeeds ? '/' + bloodNeeds.id : ''}`,
      {
        method: bloodNeeds ? 'PATCH' : 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    if ('id' in data) router.push('/admin/blood-needs');
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
          name="bloodTypes"
          label="Групи крові (розділіть, будь ласка, комами)*:"
          placeholder="1+, 1-, 2+, 2-"
          required={true}
          value={bloodNeeds ? bloodNeeds.bloodTypes.join(', ') : undefined}
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
