import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEvent } from 'react';

import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

type ReturnValue = {
  Product: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
};

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

type Props = {
  id: string;
};

export default function UpdateProduct({ id }: Props) {
  const { data, error, loading } = useQuery<ReturnValue>(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  const { inputs, clearForm, resetForm, handleChange } = useForm({
    name: data?.Product.name || '',
    price: data?.Product.price || '',
    description: data?.Product.description || '',
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation<ReturnValue>(UPDATE_PRODUCT_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line
    const res = await updateProduct({
      variables: {
        id,
        description: inputs.description,
        name: inputs.name,
        price: inputs.price,
      },
      // eslint-disable-next-line
    }).catch(console.error);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  if (!data) return <DisplayError error={new Error('No data received')} />;

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
