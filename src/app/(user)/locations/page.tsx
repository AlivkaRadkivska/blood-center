import BloodNeedsModal from '@/components/blood-needs/blood-needs-modal';
import { LocationsContainer } from '@/components/locations/locations-container';
import CitySelect from '@/components/cities/city-list';
import Search from '@/components/ui/search';
import Title from '@/components/ui/title';
import { CityT } from '@/types/city';
import Pagination from '@/components/ui/pagination';
import { getLocationNumber } from '@/utils/db-helper';

interface LocationsPageProps {
  searchParams?: {
    city?: string;
    search?: string;
    page?: string;
  };
}

export default async function LocationsPage({
  searchParams,
}: LocationsPageProps) {
  const city: string = searchParams?.city || '';
  const search: string = searchParams?.search || '';
  const cities: CityT[] = await fetch(`${process.env.BACKEND_URL}/api/cities`, {
    next: { revalidate: 10 },
  }).then((res) => res.json());
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 5;
  const totalPages = await getLocationNumber(limit, {
    active: true,
    search,
    cityId: city,
  });

  return (
    <>
      <section className="flex flex-col w-full h-full items-center justify-start pt-20 mb-auto">
        <Title>
          <h1>Пункти прийому крові</h1>
        </Title>

        <div className="mt-3 flex flex-col sm:flex-row items-start p-1 w-full max-w-[1000px] justify-stretch gap-4">
          <div className="flex flex-col items-start w-full sm:w-[50%] gap-3">
            <Search placeholder="Вул. Здоров'я, 1" />
            <CitySelect cities={cities} />
          </div>
          <LocationsContainer
            city={city}
            search={search}
            currentPage={currentPage}
            limit={limit}
          />
        </div>
      </section>

      <Pagination totalPages={totalPages} />

      <BloodNeedsModal />
    </>
  );
}
