import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../config';
import DisplayError from './ErrorMessage';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

type Props = {
  page: number;
};

export default function Pagination({ page }: Props) {
  const { error, loading, data } = useQuery<{
    _allProductsMeta: { count: number };
  }>(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const count = data?._allProductsMeta.count || 0;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>{'<- Prev'}</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{data?._allProductsMeta.count || 0} Items total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>{'Next ->'}</a>
      </Link>
    </PaginationStyles>
  );
}
