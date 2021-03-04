import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apolloClient';
import 'antd/dist/antd.css';
import './../styles/index.scss';

import Head from 'next/head';

export default function App({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <div className='_app'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=swap'
            rel='stylesheet'
          />
        </Head>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}
