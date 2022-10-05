// TODO: Add login page that accepts username/password
// TODO: Send to https://order-pizza-api.herokuapp.com/api/auth/
// TODO: Use returned token in auth header
// TODO: Add order page that allows pizza configuration:
//  - Crust (string)
//  - Flavor (string)
//  - Size (string)
//  - Table # (integer)
// TODO: Send order to the /order endpoint
// TODO: Display a success confirmation
// TODO: Ability to delete an order
// TODO: Ability to add more than one order
// TODO: Add orders page that shows a list of all pizza orders
// TODO: Ability to filter list of orders
// TODO: BONUS: Containerize the app
// TODO: BONUS: Create proxy app that this app uses to connect with the API
import Head from 'next/head'
import Heading from '../components/Heading';
import LoginForm from '../components/LoginForm';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>PizzaTime: Login</title>
        <meta name="description" content="Login to PizzaTime" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading>Login</Heading>
        <LoginForm />
      </main>
    </>
  )
}
