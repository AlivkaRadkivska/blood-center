'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DeleteLocation({ id }: { id: string }) {
  const [error, setError] = useState<string | null>();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/locations/${id}`, {
      method: 'DELETE',
    })
      .then(async (res) => await res.json())
      .then((res) => {
        if ('error' in res) setError(res.error);
        if ('id' in res) router.push('/admin/locations');
      });
  }, []);

  return <>{error && <p>{error}</p>}</>;
}
