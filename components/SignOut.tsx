import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';

const SING_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SingOut() {
  const [signOut] = useMutation(SING_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
