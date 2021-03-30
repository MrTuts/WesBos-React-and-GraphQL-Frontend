import Link from 'next/link';

import formatMoney from '../lib/formatMoney';
import { ProductType } from '../types';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

type Props = {
  product: ProductType;
};

export default function Product({ product }: Props) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete */}
    </ItemStyles>
  );
}
