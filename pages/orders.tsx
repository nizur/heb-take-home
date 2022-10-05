import Head from 'next/head'
import Heading from '../components/Heading';

export default function Orders(): JSX.Element {
  return (
    <>
      <Head>
        <title>PizzaTime: Orders</title>
        <meta name="description" content="Your placed orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Orders</Heading>
      </main>
    </>
  )
}

