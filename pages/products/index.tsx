import { useRouter } from 'next/router';

import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();

  // @ts-ignore
  const currentPage = Number.parseInt(query?.page) || 1;

  return (
    <div>
      <Pagination page={currentPage} />
      <Products page={currentPage} />
      <Pagination page={currentPage} />
    </div>
  );
}
