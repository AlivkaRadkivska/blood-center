'use client';
import { SetStateAction, useState } from 'react';

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  id?: string;
  value?: string;
}

export default function Textarea({
  label,
  name,
  placeholder,
  id,
  value,
  required,
}: InputProps) {
  const [currValue, setCurrValue] = useState(value ? value : '');

  function handleChange(e: { target: { value: SetStateAction<string> } }) {
    setCurrValue(e.target.value);
  }

  return (
    <label className="flex flex-col md:flex-row gap-3 items-center max-content min-w-96">
      <span className="text-nowrap">{label}</span>
      <textarea
        cols={30}
        name={name}
        id={id ? id : name}
        value={currValue}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className="ease-in-out duration-200 px-4 py-1 border-2 border-purple text-purple rounded-lg
        focus:outline-red w-full min-w-40"
      />
    </label>
  );
}
