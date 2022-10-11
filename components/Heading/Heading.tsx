import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

function Heading({ children, className }: HeadingProps): JSX.Element {
  const classes = `text-3xl font-bold ${className}`;

  return (
    <h1 className={classes}>
      {children}
    </h1>
  );
}

export default Heading;
