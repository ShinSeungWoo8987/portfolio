import '../styles/globals.css';

import { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, createHttpLink } from '@apollo/client';

import Navigation from '../src/components/Navigation';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../src/accessToken';
import Cookies from 'js-cookie';

function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    // uri: 'http://localhost:5000/graphql',
    uri: 'http://59.14.116.241:5000/graphql',

    credentials: 'include',
    cache: new InMemoryCache(),
    headers: { authorization: `barer ${getAccessToken()}` },
  });

  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
