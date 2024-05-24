import BloodNeedsModal from '@/components/blood-needs/blood-needs-modal';
import { LocationsContainer } from '@/components/locations/locations-container';
import CitySelect from '@/components/ui/city-list';
import Search from '@/components/ui/search';
import Title from '@/components/ui/title';
import { CityT } from '@/types/city';

interface LocationsPageProps {
  searchParams?: {
    region?: string;
    search?: string;
  };
}

export default async function LocationsPage({
  searchParams,
}: LocationsPageProps) {
  const region = searchParams?.region || '';
  const search = searchParams?.search || '';
  const cities: CityT[] = await fetch(`${process.env.BACKEND_URL}/api/cities`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());

  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <Title>
        <h1>Усі пункти прийому</h1>
      </Title>

      <div className="flex items-start p-1 w-full max-w-[800px] justify-stretch gap-3">
        <div className="flex flex-col items-start w-[50%]">
          <Search placeholder="Вул. Здоров'я, 1, м. Житомир" />
          <CitySelect cities={cities} />
        </div>
        <LocationsContainer region={region} search={search} />
      </div>

      <BloodNeedsModal />
    </div>
  );
}
