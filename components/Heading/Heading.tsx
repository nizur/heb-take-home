import type { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
}

function Heading({ children }: HeadingProps): JSX.Element {
  return (
    <h1 className="text-3xl font-bold">
      {children}
    </h1>
  );
}

export default Heading;
