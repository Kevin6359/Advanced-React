import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage({ query }) {
  const page = Number(query.page) || 1;
  return (
    <div>
      <Pagination page={page} />
      <Products />
      <Pagination page={page} />
    </div>
  );
}
