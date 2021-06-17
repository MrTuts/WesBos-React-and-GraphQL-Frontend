export type PhotoImage = {
  id: string;
  image: {
    publicUrlTransformed: string;
  };
};

export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  photo?: PhotoImage;
};
