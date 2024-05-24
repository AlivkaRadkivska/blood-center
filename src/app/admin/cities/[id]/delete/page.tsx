import { DeleteCity } from '@/components/cities/delete-city';

interface AdminDeleteCityPageProps {
  params: { id: string };
}

export default function AdminDeleteCityPage({
  params,
}: AdminDeleteCityPageProps) {
  return <DeleteCity id={params.id} />;
}
