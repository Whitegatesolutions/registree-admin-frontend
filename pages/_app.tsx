import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { swrFetcher } from '../utils/api-requests/axios-requests';


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus : false,
      retry : 2,
      retryDelay : attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
}});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig value={{ fetcher : swrFetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </QueryClientProvider>
  );
}