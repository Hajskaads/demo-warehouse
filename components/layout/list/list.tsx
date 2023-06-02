import { ProductStock } from '@lib/types';
import ProductItem from './productItem';

/**
 * List component.
 *
 * @param {Object} props - The component props.
 * @param {ProductStock[]} props.list - The list of product stocks.
 * @returns {JSX.Element} The rendered List component.
 */
export default function List({ list }: { list: ProductStock[] }) {
  return (
    <ul className="flex w-full flex-col space-y-2 items-center">
      {/* Render each product item */}
      {list.map((product: ProductStock, index: number) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
}
