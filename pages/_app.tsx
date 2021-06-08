import { ApolloProvider } from '@apollo/client';
import { NextPage, NextPageContext } from 'next';
import { WithApolloProps } from 'next-with-apollo';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import Page from '../components/Page';
import { CartStateProvider } from '../lib/cartState';
import withData from '../lib/withData';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({
  Component,
  pageProps,
  apollo,
}: AppProps & WithApolloProps<unknown>) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

// nextJs thing
// fetch all page queries
MyApp.getInitialProps = async function ({
  Component,
  ctx,
}: {
  Component: unknown;
  ctx: unknown;
}) {
  let pageProps = {};
  // @ts-ignore
  if (Component.getInitialProps) {
    // @ts-ignore
    pageProps = await Component.getInitialProps(ctx);
  }
  // @ts-ignore
  pageProps.query = ctx.query;
  // @ts-ignore
  return pageProps;
};

// @ts-ignore
export default withData(MyApp);
