import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEventHandler } from 'react';

import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

// type SingInData = {
//   authenticateUserWithPassword: {
//     __typename:
//       | 'UserAuthenticationWithPasswordFailure'
//       | 'UserAuthenticationWithPasswordSuccess';
//     UserAuthenticationWithPasswordSuccess?: {
//       id: string;
//       email: string;
//       name: string;
//     };
//     UserAuthenticationWithPasswordFailure?: {
//       code: string;
//       message: string;
//     };
//   };
// };

type SingInData = {
  authenticateUserWithPassword:
    | {
        __typename: 'UserAuthenticationWithPasswordSuccess';
        item: {
          id: string;
          email: string;
          name: string;
        };
      }
    | {
        __typename: 'UserAuthenticationWithPasswordFailure';
        code: string;
        message: string;
      };
};

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation<SingInData>(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in used
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signin();
    resetForm();
  };

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form
      method="POST" // prevent putting inputted values into url (password)
      onSubmit={handleSubmit}
    >
      <h2>Sign Into Your Account</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Sing In!</button>
    </Form>
  );
}
