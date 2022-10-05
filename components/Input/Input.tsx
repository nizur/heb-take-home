import type { RefObject } from 'react';
import { forwardRef } from 'react';

export interface InputProps {
  onChange?: () => {},
  placeholder?: string;
  type?: string;
  value: string;
}

const Input = forwardRef((
  {
    type = 'text',
    ...restProps
  }: InputProps,
  ref: RefObject<HTMLInputElement>
) => {

  return (
    <input
      className="block appearance-none w-full bg-white text-slate-800 border border-slate-300 focus:border-amber-300 focus:outline-none px-2 py-2 rounded"
      type={type}
      ref={ref}
      {...restProps}
    />
  );
});

Input.displayName = 'Input';

export default Input;
