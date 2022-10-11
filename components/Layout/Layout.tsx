import { ReactNode } from 'react';
import Menu from '../Menu';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className = '' }: LayoutProps): JSX.Element {
  return (
    <div className={className}>
      <Menu />
      {children}
    </div>
  )
}

export default Layout;
