import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { store } from '@/store';
import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={jakarta.className}>
        <Toaster richColors expand={true} />
        <NextNProgress
          showOnShallow={false}
          options={{ showSpinner: false }}
          color="#000"
        />
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
