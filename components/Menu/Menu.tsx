import Link from 'next/link';
import { useAuth } from '../../contexts/auth';

function Menu(): JSX.Element | null {
  const { isLoading, accessToken } = useAuth();

  if (isLoading || !accessToken) return null;

  return (
    <div className="flex items-center py-8">
      <Link href="/orders"><a className="flex-1 text-center">Orders</a></Link>
      <Link href="/new_order"><a className="flex-1 text-center">New Order</a></Link>
      <Link href="/logout"><a className="flex-1 text-center">Logout</a></Link>
    </div>
  )
}

export default Menu;
