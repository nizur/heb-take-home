import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '../contexts/auth';
import Layout from '../components/Layout';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }): JSX.Element {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <Layout className="container mx-auto">
        <Component {...pageProps} />
      </Layout>
        </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
