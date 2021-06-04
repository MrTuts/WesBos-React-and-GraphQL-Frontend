import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEventHandler } from 'react';

import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';
import Form from './styles/Form';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

type SingUpData = {
  createUser: {
    id: string;
    email: string;
    name: string;
  };
};

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation<SingUpData>(
    SIGNUP_MUTATION,
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
      <h2>Sign Up For an Account</h2>
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead nd Sign in!
          </p>
        )}
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
      <button type="submit">Sing Up!</button>
    </Form>
  );
}
