import { CityT } from '@/types/city';
import { SetStateAction } from 'react';

interface CitySelectProps {
  cities: CityT[];
  onChange: (value: string) => void;
}

export default function CitySelect({ cities, onChange }: CitySelectProps) {
  function handleChange(e: { target: { value: SetStateAction<string> } }) {
    onChange(e.target.value.toString());
  }
  return (
    <select
      name="city"
      id="city"
      onChange={handleChange}
      className="ease-in-out duration-200 px-4 py-1 border-2 border-purple text-purple rounded-lg cursor-pointer hover:bg-purple hover:text-white"
    >
      {cities.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
