import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import './index.css';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { ContextProvider } from './contexts/ContextProvider';
import App from './App';

const client = new ApolloClient({
  uri: 'https://hub.snapshot.org/graphql', // Your running GraphQL server URL
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={ChainId}>
      <ApolloProvider client={client}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ApolloProvider>,
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
