import { ChangeEvent } from 'react';

export interface SelectProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | number[];
  value: string | number;
}

function Select({
  name,
  onChange,
  options,
  value
}: SelectProps): JSX.Element {
  return (
    <select
      className="
        w-full h-10 
        pl-3 pr-6 mb-2
        bg-yellow-100
        text-base text-slate-800 placeholder-gray-600 
        border border-yellow-300 rounded 
        appearance-none"
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option: string | number, i: number) => (
        <option key={`option-${i}`} value={option}>{option}</option>
      ))}
    </select>
  );
}

export default Select;
