import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

type Props = {
  id: string;
};

const BugButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export default function RemoveFromCart({ id }: Props) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
  });

  return (
    <BugButton
      title="Remove this item from Cart"
      type="button"
      // @ts-ignore
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BugButton>
  );
}
