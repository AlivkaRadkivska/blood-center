import Title from '@/components/ui/title';
import { LocationT } from '@/types/location';
import { CityT } from '@/types/city';
import { LocationForm } from '@/components/locations/location-form';

interface AdminEditLocationPageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditLocationPage({
  params: { id },
}: AdminEditLocationPageProps) {
  const cities: CityT[] = await fetch(`${process.env.BACKEND_URL}/api/cities`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
  const location: LocationT = await fetch(
    `${process.env.BACKEND_URL}/api/locations/${id}`,
    { next: { revalidate: 10 } }
  ).then((res) => res.json());

  return (
    <>
      <Title>Редагування пункту прийому крові</Title>

      <LocationForm location={location} cities={cities} />
    </>
  );
}
