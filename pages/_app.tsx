import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useState} from 'react';
import {UserProvider} from '../lib/contexts/user-context';

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
        transition={Slide}
      />
    </QueryClientProvider>
  );
}

export default MyApp;
