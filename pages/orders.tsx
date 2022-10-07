import { useState } from 'react';
import { readFile } from 'jsonfile';
import Head from 'next/head'
import type { PlacedOrder } from '../types/pizza';
import type { OnFilterData } from '../components/OrdersFilter';
import Heading from '../components/Heading';
import OrdersFilter from '../components/OrdersFilter';
import OrderCard from '../components/OrderCard';

// TODO: Ability to delete an order
// TODO: Add orders page that shows a list of all pizza orders
// TODO: Add error message alert. Maybe ErrorBoundary?

interface OrdersProps {
  orders?: PlacedOrder[];
}

const filterableOptions = ['Flavor', 'Crust', 'Size', 'Table_No'];

export default function Orders({ orders }: OrdersProps): JSX.Element {
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const onChangeFilter = ({ prop = 'Flavor', value }: OnFilterData) => {
    if (!value.length) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      if (prop === 'Table_No') {
        return order[prop] === Number(value);
      }

      // Standardize values before filtering
      const orderValue = order[prop].toLowerCase();
      const fragment = value.toLowerCase();

      return orderValue.includes(fragment);
    });

    setFilteredOrders(filtered);
  };

  return (
    <>
      <Head>
        <title>PizzaTime: Orders</title>
        <meta name="description" content="Your placed orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-between">
          <Heading className="flex-auto">Orders</Heading>
          <OrdersFilter options={filterableOptions} onFilter={onChangeFilter} />
        </div>

        <div className="flex flex-wrap gap-6 mt-8">
          {!filteredOrders.length && <p>No orders match your search criteria</p>}
          {filteredOrders?.map(order => (
            <OrderCard key={order.Order_ID} order={order} />
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const json = `${process.cwd()}/db/index.json`;
  const orders = await readFile(json);
  return { props: { orders } };
};
