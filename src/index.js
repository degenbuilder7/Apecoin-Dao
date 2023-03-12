import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

const client = new ApolloClient({
  uri: 'https://hub.snapshot.org/graphql', // Your running GraphQL server URL
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
