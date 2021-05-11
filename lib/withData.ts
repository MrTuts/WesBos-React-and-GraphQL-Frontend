import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { onError } from '@apollo/link-error';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';

import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          /* 
            handling link error
            catches eg. wrong password, when requesting field that doesn't exist
          */
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      // responsible for fetching data etc.
      // this supports files upload
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // handle products pagination when manipulating items
            allProducts: paginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

/* crawl all pages and component and looks for any queries we have, 
  and server will wait for data to be fetched before sending the html 
*/
export default withApollo(createClient, { getDataFromTree });
