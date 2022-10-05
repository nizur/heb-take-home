import AuthProvider from '../contexts/auth';
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout className="container mx-auto">
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
