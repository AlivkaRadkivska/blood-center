'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DeleteDBItem({ id, table }: { id: string; table: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    fetch(`/api/${table}/${id}`, {
      method: 'DELETE',
    })
      .then(async (res) => await res.json())
      .then((res) => {
        if ('error' in res) setError(res.error);
        if ('id' in res) router.push(`/admin/${table}`);
      });
  }, []);

  return <>{error && <p>{error}</p>}</>;
}
