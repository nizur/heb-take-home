import { useState } from 'react';
import Head from 'next/head'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteOrderById, fetchOrders } from '../services/api';
import type { OnFilterData } from '../components/OrdersFilter';
import Heading from '../components/Heading';
import OrdersFilter from '../components/OrdersFilter';
import OrderCard from '../components/OrderCard';

const filterableOptions = ['Flavor', 'Crust', 'Size', 'Table_No'];

export default function Orders(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [property, setProperty] = useState(filterableOptions[0]);
  const queryClient = useQueryClient();
  const orders = useQuery(
    ['orders', filter, property],
    () => fetchOrders({ filter, property })
  );
  const mutation = useMutation(deleteOrderById, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['orders'])
    },
  });

  const onChangeFilter = ({ prop = 'Flavor', value }: OnFilterData) => {
    setFilter(value);
    setProperty(prop);
  };

  const onCancelOrder = async (id: string): Promise<void> => {
    await mutation.mutateAsync(id);
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
          {orders.status === 'loading' ? (
            <p>Loading orders...</p>
          ) : (orders.status === 'error') ? (
            <>
              <p>{orders.error.message}</p>
            </>
          ) : (
            <>
              {orders.data?.map(order => (
                <OrderCard key={order.Order_ID} order={order} onCancel={onCancelOrder} />
              ))}
            </>
          )}
        </div>
      </main>
    </>
  )
}
