import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FormEvent } from 'react';

import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are passed in what types are they
    $name: String! # ! means required
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      # what should be created on BE
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        # Nested create to create linked ProductImage with one mutation
        # This is not a standard and is provided by Keystone
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      # what gets returned after mutation is done
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, clearForm, resetForm, handleChange } = useForm({
    image: '',
    name: 'sdass',
    price: '',
    description: '',
  });

  /* 
    createProduct - function to run mutation
    data - data returned from mutation, also gets returned by createProduct fn
   */
  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // passed data, but we can also pass them to createProduct fn
      variables: inputs,
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line
      const { data } = await createProduct();
      clearForm();
    } catch (er) {
      // errors is set to error in useMutation
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
