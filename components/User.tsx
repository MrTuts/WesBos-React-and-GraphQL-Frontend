import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      # authenticatedItem can return union of types, this way we specify which type we want
      ... on User {
        id
        email
        name
        # TODO Query the card once we have it
      }
    }
  }
`;

type User = {
  authenticatedItem: {
    id: string;
    email: string;
    name: string;
  };
};

export function useUser() {
  const { data } = useQuery<User>(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}

// export default function User() {}
