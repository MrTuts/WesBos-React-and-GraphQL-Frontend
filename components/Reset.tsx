import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEventHandler } from 'react';

import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

type ResetData = {
  redeemUserPasswordResetToken: {
    code: string;
    message: string;
  } | null;
};

type Props = {
  token: string;
};

export default function Reset({ token }: Props) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation<ResetData>(
    RESET_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in used
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await reset();
    resetForm();
  };

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  return (
    <Form
      method="POST" // prevent putting inputted values into url (password)
      onSubmit={handleSubmit}
    >
      <h2>Reset your password</h2>
      <Error error={error || successfulError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now Sing in</p>
        )}
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
      <button type="submit">Reset!</button>
    </Form>
  );
}
