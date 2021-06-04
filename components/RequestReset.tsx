import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEventHandler } from 'react';

import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

type RequestResetData = {
  sendUserPasswordResetLink: {
    code: string;
    message: string;
  } | null;
};

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation<RequestResetData>(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in used
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    await signup().catch(console.error);
    resetForm();
  };

  return (
    <Form
      method="POST" // prevent putting inputted values into url (password)
      onSubmit={handleSubmit}
    >
      <h2>Request a Password reset</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link</p>
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
      </fieldset>
      <button type="submit">Request reset!</button>
    </Form>
  );
}
