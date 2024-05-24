import { CityForm } from '@/components/cities/city-form';
import Title from '@/components/ui/title';
import { CityT } from '@/types/city';

interface AdminEditCityPageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditCityPage({
  params: { id },
}: AdminEditCityPageProps) {
  const city: CityT = await fetch(
    `${process.env.BACKEND_URL}/api/cities/${id}`,
    { next: { revalidate: 10 } }
  ).then((res) => res.json());

  return (
    <>
      <Title>Редагування міста</Title>

      <CityForm city={city} />
    </>
  );
}
