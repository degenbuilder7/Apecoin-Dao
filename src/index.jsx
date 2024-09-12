/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import './index.css';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { ContextProvider } from './contexts/ContextProvider';
import App from './App.tsx';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { domainName } from './consts/yourDetails';

const client = new ApolloClient({
  uri: 'https://hub.snapshot.org/graphql', // Your running GraphQL server URL
  cache: new InMemoryCache(),
});

const activeChain = 'mumbai';

function getLibrary(provider) {
  // this will vary according to whether you use e.g. ethers or web3.js
  const gottenProvider = new ethers.providers.Web3Provider(provider, 'any');
  return gottenProvider;
}

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <ApolloProvider client={client}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </ApolloProvider>
      </Web3ReactProvider>
    </ThirdwebProvider>,
  </React.StrictMode>,
  document.getElementById('root'),
);
