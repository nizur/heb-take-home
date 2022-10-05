import Menu from '../Menu';

interface LayoutProps {
  children: any; // TODO: Get rid of any
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="container mx-auto">
      <Menu />
      {children}
    </div>
  )
}

export default Layout;
