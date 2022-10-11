import { useState, KeyboardEvent } from 'react';
import Button from '../Button';

export interface OnFilterData {
  prop?: string;
  value: string;
}

interface OrdersFilterProps {
  options: string[];
  onFilter: ({ prop, value }: OnFilterData) => void;
}

function OrdersFilter({
  options,
  onFilter,
}: OrdersFilterProps): JSX.Element {
  const [prop, setProp] = useState(options[0]);
  const [value, setValue] = useState('');

  const submitIfEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      onFilter({ prop, value });
    }
  };

  return (
    <div className="border rounded overflow-hidden flex">
      <select
        className="flex-1 px-2 py-1 bg-inherit border-r focus:outline-none"
        onChange={(e) => setProp(e.target.value)}
      >
        {options.map((option, i) => (
          <option key={`option-${i}`} value={option}>{option}</option>
        ))}
      </select>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={submitIfEnter}
        className="flex-auto w-full px-2 py-1 bg-inherit"
        placeholder="Search..."
      />
      <Button
        className="flex-1 flex items-center justify-center px-4 border-l"
        onClick={() => onFilter({ prop, value })}
      >
        <svg
          className="h-4 w-4 text-grey-dark"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        </svg>
      </Button>
    </div>
  );
}

export default OrdersFilter;
