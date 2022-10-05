import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth';
import logo from '../../public/pizzatime-logo.png';

function Menu(): JSX.Element | null {
  const { isLoading, accessToken, logout } = useAuth();

  if (isLoading || !accessToken) return null;

  return (
    <div className="flex items-center py-8">
      <Image className="flex-auto max-h-3" layout="fixed" src={logo} alt="PizzaTime" />
      <Link href="/orders"><a className="flex-1 text-center">Orders</a></Link>
      <Link href="/"><a className="flex-1 text-center">New Order</a></Link>
      <a className="flex-1 text-center cursor-pointer" onClick={logout}>Logout</a>
    </div>
  )
}

export default Menu;
