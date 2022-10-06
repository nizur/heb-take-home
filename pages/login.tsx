// TODO: Add order page that allows pizza configuration:
//  - Crust (string)
//  - Flavor (string)
//  - Size (string)
//  - Table # (integer)
// TODO: Display a success confirmation
// TODO: Ability to add more than one order
// TODO: BONUS: Containerize the app
import Head from 'next/head'
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
        <LoginForm />
      </main>
    </>
  )
}
