import { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { deleteOrderById, fetchOrders } from '../services/api';
import Heading from '../components/Heading';
import OrdersFilter, { OnFilterData } from '../components/OrdersFilter';
import OrderCard from '../components/OrderCard';
import 'react-toastify/dist/ReactToastify.css';
import { PlacedOrder } from '../types/pizza';

const filterableOptions = ['Flavor', 'Crust', 'Size', 'Table_No'];

export default function Orders(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [property, setProperty] = useState(filterableOptions[0]);
  const queryClient = useQueryClient();
  const orders = useQuery<PlacedOrder[], Error>(
    ['orders', filter, property],
    () => fetchOrders({ filter, property })
  );

  const mutation = useMutation(deleteOrderById, {
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries(['orders']);
      toast.success('Order canceled!');
    },
    onError: async () => {
      toast.error('Oops! There was an error canceling your order');
    }
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
        <ToastContainer theme="colored" autoClose={3000} hideProgressBar />

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
              {orders.status === 'success' && orders.data.length === 0 && (
                <p className="text-bold">Looks like you have no orders! Try <Link href="/">placing an order</Link>.</p>
              )}
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
