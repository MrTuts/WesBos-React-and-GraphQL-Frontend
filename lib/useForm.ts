import { ChangeEvent, ChangeEventHandler, useState } from 'react';

export default function useForm<T extends Record<string, string | number>>(
  // @ts-ignore
  initial: T = {}
): {
  inputs: T;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
  clearForm: () => void;
} {
  const [inputs, setInputs] = useState(initial);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      // @ts-ignore
      value = parseInt(value);
    }
    if (type === 'file') {
      // files is an array, take just first item
      // @ts-ignore
      [value] = e.target.files;
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
