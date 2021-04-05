import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    # id (or another param) must be unique, when we are fetching for single item
    # we could rename Product to eg items by writing:
    # items: Product(where: { id: $id }) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
    # if we were to fetch multiple products, we could do like so:
    # allProducts(where: { name_contains_i: "yeti" }) {
    #  name
    #  price
    #}
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

type QueryData = {
  Product: {
    name: string;
    price: number;
    description: string;
    photo: {
      altText: string;
      image: {
        publicUrlTransformed: string;
      };
    };
  };
};

type Props = {
  id: string;
};

export default function SingleProduct({ id }: Props) {
  const { data, loading, error } = useQuery<QueryData>(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  if (!data) return <DisplayError error={new Error('No data received')} />;

  const { Product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}
