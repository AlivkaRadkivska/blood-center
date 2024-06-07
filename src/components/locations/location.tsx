import { LocationT } from '@/types/location';
import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import Link from 'next/link';

interface LocationProps {
  index: number;
  location: LocationT;
}

export default function Location({ index, location }: LocationProps) {
  return (
    <div className="w-full text-center sm:text-left flex flex-col gap-1 border-b-2 p-2 border-purple last:border-none">
      <p className="text-lg text-red">{index}&#41; Institution</p>
      <p className="flex items-center gap-1 justify-center sm:justify-start">
        <MapPinIcon className="size-4" />
        {location.address}
        {location.city ? `, м.${location.city.name}` : ''}
      </p>
      <div className="flex flex-row items-center gap-1 sm:gap-5 justify-between sm:justify-start">
        <p className="flex items-center gap-1">
          <PhoneIcon className="size-4" />
          +38 (097) 777 77 77
        </p>
        <p className="flex items-center gap-1">
          <ClockIcon className="size-4" />
          08.30 - 23.45
        </p>
      </div>
      <div className="w-full items-start">
        <Link
          href={location.url}
          target="_blank"
          className="italic hover:underline"
        >
          Переглянути на карті &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
