import { MouseEvent, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  children,
  className = '',
  disabled = false,
  onClick
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`px-4 py-2
        disabled:bg-amber-100 bg-amber-300 hover:bg-amber-400 
        focus:bg-amber-400 focus:outline-none 
        text-slate-800 font-bold capitalize
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
