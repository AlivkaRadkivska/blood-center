import { LocationsContainer } from '@/components/locations-container';
import Title from '@/components/ui/title';
import { CityT } from '@/types/city';

export default async function LocationsPage() {
  const cities: CityT[] = await fetch(
    `${process.env.BACKEND_URL}/api/cities`
  ).then((res) => res.json());

  return (
    <>
      <Title text="Усі пункти прийому" />
      <LocationsContainer cities={cities} />
    </>
  );
}
