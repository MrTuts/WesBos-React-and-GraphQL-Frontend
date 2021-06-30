import { useMutation } from '@apollo/client';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import gql from 'graphql-tag';
import nProgress from 'nprogress';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';

import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');

function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StripeError | undefined | null>(null);
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const card = elements?.getElement(CardElement);
    if (!card || !stripe) {
      return;
    }
    // stop form from submitting and turn loader on
    e.preventDefault();
    setLoading(true);
    // start the page transition
    nProgress.start();
    // create the payment method via stripe (Token comes here if successful)
    const {
      error: stripeError,
      paymentMethod,
    } = await stripe?.createPaymentMethod({
      type: 'card',
      card,
    });
    // Handle any errors from stripe
    if (!paymentMethod || error) {
      setError(stripeError);
      nProgress.done();
      return;
    }
    // Send the token from step 3 to our keystone server via a custom mutation
    const order = await checkout({ variables: { token: paymentMethod.id } });
    console.log('Finished with the order');
    console.log(order);
    // Change the page to view the order
    // Close the cart
    // Turn the loader off
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
