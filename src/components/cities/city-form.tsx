'use client';
import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { useRouter } from 'next/navigation';
import { CityT } from '@/types/city';

export function CityForm({ city }: { city?: CityT }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/cities${city ? '/' + city.id : ''}`, {
      method: city ? 'PATCH' : 'POST',
      body: formData,
    });

    const data = await response.json();
    if ('id' in data) router.push('/admin/cities');
    if ('error' in data) setError(data.error);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-4 w-full max-w-[600px]"
      >
        <Input
          type="text"
          name="name"
          label="Назва міста*:"
          placeholder="Місто"
          required={true}
          value={city ? city.name : undefined}
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
