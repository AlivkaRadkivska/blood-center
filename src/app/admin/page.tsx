import { currentUser } from '@clerk/nextjs/server';

export default async function AdminPage() {
  const user = await currentUser();

  return (
    <div>
      <div className="flex w-full items-center justify-center gap-3">
        <p>Вітаю, {user?.fullName}</p>
      </div>
    </div>
  );
}
