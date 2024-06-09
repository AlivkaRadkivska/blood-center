import { LocationForm } from '@/components/locations/location-form';
import Title from '@/components/ui/title';
import { CityT } from '@/types/city';

export default async function AdminAddLocationPage() {
  const cities: CityT[] = await fetch(`${process.env.BACKEND_URL}/api/cities`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <>
      <Title>Додавання пункту прийому крові</Title>

      <LocationForm cities={cities} />
    </>
  );
}
