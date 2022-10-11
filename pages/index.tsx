import { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { Order } from '../types/pizza';
import { postNewOrder } from '../services/api';
import { flavors, crusts, sizes, tableNos } from '../services/options';
import Button from '../components/Button';
import Heading from '../components/Heading';
import NewOrderCard, { NewOrderCardOnUpdate } from '../components/NewOrderCard';
import 'react-toastify/dist/ReactToastify.css';

export default function NewOrder(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([])

  const isValidOrder = (): boolean => {
    return Boolean(orders.length);
  };

  const postOrders = async (): Promise<void> => {
    if (!isValidOrder()) {
      return;
    }

    try {
      orders.forEach(async (order) => {
        await postNewOrder(order);
      });
      toast.success(`${orders.length} pizzas ordered!`);
    } catch (e) {
      toast.error('Oops! There was an error placing your order. Please try again.');
    }
  };

  const mutate = useMutation(postOrders);

  const removeOrder = (id: string): void => {
    const updatedOrders = orders.filter((_, i) => i !== Number(id));
    setOrders(updatedOrders);
  };

  const updateOrder = ({ index, property, value }: NewOrderCardOnUpdate): void => {
    const updatedOrders = [...orders];
    updatedOrders[index][property] = value;
    setOrders(updatedOrders);
  };

  const addToOrder = () => {
    setOrders([
      ...orders,
      {
        Flavor: flavors[0],
        Crust: crusts[0],
        Size: sizes[0],
        Table_No: tableNos[0],
      }
    ]);
  };

  return (
    <>
      <Head>
        <title>PizzaTime: New Order</title>
        <meta name="description" content="Place a new order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ToastContainer theme="colored" autoClose={3000} hideProgressBar />

        <div className="flex justify-between">
          <Heading className="flex-auto">New Order</Heading>
          <Link href="/orders">View your orders</Link>
        </div>

        {orders.map((order, i) => (
          <NewOrderCard
            key={`neworder-${i}`}
            id={String(i)}
            order={order}
            onUpdate={updateOrder}
            onCancel={removeOrder}
          />
        ))}

        <div className="my-4 flex justify-between">
          <Button onClick={() => addToOrder()} className="rounded">
            Add {orders.length > 0 ? 'another' : 'a'} pizza
          </Button>

          <Button
            disabled={!isValidOrder()}
            onClick={() => mutate.mutate()}
            className="rounded"
          >
            Place Order
          </Button>
        </div>
      </main>
    </>
  )
}


