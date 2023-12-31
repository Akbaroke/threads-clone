import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store';
import '@/styles/globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={jakarta.className}>
        <Toaster />
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
