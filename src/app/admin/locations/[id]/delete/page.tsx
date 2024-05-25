import { DeleteLocation } from '@/components/locations/delete-location';

interface AdminDeleteLocationPageProps {
  params: { id: string };
}

export default function AdminDeleteLocationPage({
  params,
}: AdminDeleteLocationPageProps) {
  return <DeleteLocation id={params.id} />;
}
