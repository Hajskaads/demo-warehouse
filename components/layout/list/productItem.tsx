'use client';

import CloseIcon from '@components/icons/close';
import { ProductStock } from '@lib/types';
import { Suspense } from 'react';
import DeleteButton from './deleteButton';

/**
 * ProductItem component.
 *
 * @param {Object} props - The component props.
 * @param {ProductStock} props.product - The product data.
 * @returns {JSX.Element} The rendered ProductItem component.
 */
export default function ProductItem({ product }: { product: ProductStock }) {
  return (
    <div className="w-full flex items-center bg-gray-100 dark:bg-gray-900 rounded-md px-4 py-1">
      {/* Render the product name */}
      <span className="flex w-1/3">{product.name}</span>
      {/* Render the product stock */}
      <span className="flex w-1/3 justify-center">{product.stock}</span>
      <span className="flex w-1/3 justify-end">
        <Suspense
          fallback={
            // Render the DeleteButton icon while loading
            <CloseIcon className="h-6 text-red-600 cursor-wait" />
          }
        >
          {/* Render the DeleteButton */}
          <DeleteButton productId={product.id} />
        </Suspense>
      </span>
    </div>
  );
}
