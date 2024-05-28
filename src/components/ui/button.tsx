export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="ease-in-out duration-200 px-4 py-1 border-2 border-purple text-purple bg-white rounded-lg hover:bg-purple hover:text-white">
      {children}
    </button>
  );
}

export function AccentButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-3 py-1 duration-200 border-2 border-red text-red rounded-lg bg-white hover:bg-red hover:text-white ease-in-out">
      {children}
    </button>
  );
}
