export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  photo?: {
    id: string;
    image: {
      publicUrlTransformed: string;
    };
  };
};
