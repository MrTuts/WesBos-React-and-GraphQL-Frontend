import { ApolloCache, FetchResult, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ReactNode } from 'react';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      # return values of the deleted item
      id
      name
    }
  }
`;

function update(
  cache: ApolloCache<any>,
  payload: FetchResult<{ deleteProduct: { id: string; name: string } }>
) {
  if (!payload.data) {
    return;
  }
  // find data in cache and remove it after item is deleted on BE
  // cache.evict({ id: cache.identify(payload.data.deleteProduct) });
  // @ts-ignore the "correct" way above does not work as expected
  cache.evict(cache.identify(payload.data.deleteProduct));
}

type Props = {
  id: string;
  children: ReactNode;
};

export default function DeleteProduct({ id, children }: Props) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  const handleClick = async () => {
    // global build in function. Not very user friendly..
    // eslint-disable-next-line
    if (confirm('Are you sure you want to delete this item?')) {
      // falls here only if user presses yes
      // eslint-disable-next-line
      await deleteProduct().catch((err) => alert(err?.message || 'error'));
    }
  };
  return (
    <button type="button" onClick={handleClick} disabled={loading}>
      {children}
    </button>
  );
}
