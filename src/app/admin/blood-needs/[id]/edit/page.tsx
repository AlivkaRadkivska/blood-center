import { BloodNeedsForm } from '@/components/blood-needs/blood-needs-form';
import Title from '@/components/ui/title';
import { BloodNeedsT } from '@/types/blood-needs';
import { CityT } from '@/types/city';

interface AdminEditBloodNeedsPageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditBloodNeedsPage({
  params: { id },
}: AdminEditBloodNeedsPageProps) {
  const cities: CityT[] = await fetch(`${process.env.BACKEND_URL}/api/cities`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
  const bloodNeeds: BloodNeedsT = await fetch(
    `${process.env.BACKEND_URL}/api/blood-needs/${id}`,
    { next: { revalidate: 10 } }
  ).then((res) => res.json());

  return (
    <>
      <Title>Редагування потреб у крові</Title>

      <BloodNeedsForm bloodNeeds={bloodNeeds} cities={cities} />
    </>
  );
}
