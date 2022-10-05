import Head from 'next/head'
import Heading from '../components/Heading';

export default function Orders() {
  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Your placed orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Orders</Heading>
      </main>
    </>
  )
}

