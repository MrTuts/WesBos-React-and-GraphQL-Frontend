import { FormEvent } from 'react';

import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, clearForm, resetForm, handleChange } = useForm({
    image: '',
    name: 'sdass',
    price: '',
    description: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
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
