import Head from 'next/head'
import Heading from '../components/Heading';

export default function NewOrder(): JSX.Element {
  return (
    <>
      <Head>
        <title>PizzaTime: New Order</title>
        <meta name="description" content="Place a new order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>New Order</Heading>
      </main>
    </>
  )
}


