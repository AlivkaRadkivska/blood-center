'use client';
import { SetStateAction, useState } from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  id?: string;
  value?: string;
  required?: boolean;
}

export default function Input({
  label,
  type,
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
      <input
        type={type}
        name={name}
        id={id ? id : name}
        value={currValue}
        placeholder={placeholder}
        onChange={handleChange}
        required={required ? required : false}
        className="ease-in-out duration-200 px-4 py-1 border-2 border-purple text-purple rounded-lg
        focus:outline-red w-full min-w-40"
      />
    </label>
  );
}
