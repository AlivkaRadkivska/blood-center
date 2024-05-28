'use client';
import { useState } from 'react';

interface InputProps {
  label: string;
  name: string;
  value?: string;
}

export default function ActiveRadio({ label, name, value }: InputProps) {
  const [currValue, setCurrValue] = useState(value ? value : 'false');

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center max-content min-w-96">
      <span className="text-nowrap">{label}</span>
      <label>
        так
        <input
          type="radio"
          name={name}
          id="true"
          onChange={() => {
            setCurrValue('true');
          }}
          checked={currValue === 'true'}
          value="true"
        />
      </label>
      <label>
        ні
        <input
          type="radio"
          name={name}
          id="false"
          onChange={() => {
            setCurrValue('false');
          }}
          checked={currValue === 'false'}
          value="false"
        />
      </label>
    </div>
  );
}
