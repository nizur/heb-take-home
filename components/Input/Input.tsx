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
      className="block 
        appearance-none 
        w-full 
        p-2
        bg-white 
        text-slate-800 
        border border-slate-300 rounded
        focus:border-amber-300 focus:outline-none"
      type={type}
      ref={ref}
      {...restProps}
    />
  );
});

Input.displayName = 'Input';

export default Input;
