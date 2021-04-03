import { ChangeEvent, useState } from 'react';

export default function useForm<T extends Record<string, string | number>>(
  // @ts-ignore
  initial: T = {}
): {
  inputs: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
  clearForm: () => void;
} {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      // @ts-ignore
      value = parseInt(value);
    }
    if (type === 'file') {
      // @ts-ignore
      value[0] = e.target.files;
    }

    setInputs((currentInputs) => ({
      ...currentInputs,
      [name]: value,
    }));
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.keys(inputs).map((key) => [key, ''])
    ) as T;

    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
