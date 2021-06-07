import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      # authenticatedItem can return union of types, this way we specify which type we want
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: number;
    price: number;
    name: string;
    description: string;
    photo: {
      image: {
        publicUrlTransformed: string;
      };
    };
  };
};

type User = {
  authenticatedItem: {
    id: string;
    email: string;
    name: string;
    cart: Array<CartItem>;
  };
};

export function useUser() {
  const { data } = useQuery<User>(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

// export default function User() {}
