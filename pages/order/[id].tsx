import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

type OrderReturn = {
  order: {
    id: string;
    charge: string;
    total: number;
    user: {
      id: string;
    };
    items: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
      photo: {
        image: {
          publicUrlTransformed: string;
        };
      };
    }>;
  };
};

export default function SingleOrderPage() {
  const { query } = useRouter();

  const { data, error, loading } = useQuery<OrderReturn>(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  if (!data?.order) {
    return null;
  }
  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
