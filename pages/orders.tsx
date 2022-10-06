import { readFile } from 'jsonfile';
import Head from 'next/head'
import type { PlacedOrder } from '../types/pizza';
import Heading from '../components/Heading';

interface OrdersProps {
  orders?: PlacedOrder[];
}

export default function Orders({ orders }: OrdersProps): JSX.Element {
  return (
    <>
      <Head>
        <title>PizzaTime: Orders</title>
        <meta name="description" content="Your placed orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Orders</Heading>
        {orders?.map(order => (
          <p key={order.Order_ID}>{order.Flavor}</p>
        ))}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const json = `${process.cwd()}/db/index.json`;
  const orders = await readFile(json);
  return { props: { orders } };
};
