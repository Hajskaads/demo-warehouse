import { Suspense } from 'react';
import List from '@components/layout/list/list';
import getProductStock from 'services/getProductStock';
import { ProductStock, ProductStockResponse } from '@lib/types';

/**
 * Retrieves product stock information from the server.
 *
 * @returns {Promise<ProductStock[] | null>} A promise that resolves to the available product stock data or null.
 */
async function handleGetProductStock(): Promise<ProductStock[] | null> {
  const data: ProductStockResponse = await getProductStock();

  if (data.error) {
    alert(data.error);
    return null;
  }

  return data.availableProducts;
}

/**
 * Renders the item list based on the available product stock data.
 *
 * @returns {JSX.Element} The rendered item list component.
 */
async function ItemList() {
  let availableProducts: ProductStock[] | null = await handleGetProductStock();

  return !availableProducts ? (
    <div className="my-4 ml-4">Ups, something went wrong. Try again later!</div>
  ) : availableProducts.length > 0 ? (
    <List list={availableProducts} />
  ) : (
    <div className="my-4 ml-4">Empty product stock</div>
  );
}

const skeleton = 'mb-2 h-14 sm:h-9 w-full animate-pulse rounded-md cursor-wait';
const activeAndTitles = 'bg-gray-800 dark:bg-gray-300';
const items = 'bg-gray-400 dark:bg-gray-700';

const title: string = 'Product stock';
const name: string = 'Name';
const qty: string = 'Quantity';

/**
 * Collections component.
 *
 * @returns {JSX.Element} The rendered Collections component.
 */
export default async function Collections() {
  return (
    <div className="w-full flex-none px-4 sm:px-8 py-2 md:py-4">
      {title ? (
        <h3 className="hidden font-semibold text-black text-xl ml-1 mb-4 dark:text-white md:block">
          {title}
        </h3>
      ) : null}
      <div className="w-full flex items-center px-4 py-2">
        <span className="flex w-1/3 font-semibold">{name}</span>
        <span className="flex w-1/3 justify-center font-semibold">{qty}</span>
        <span className="flex w-1/3">
          {/* This takes the width taken by the delete icon, to prevent possible misalignments between table header and table rows */}
          <div className="w-6" />
        </span>
      </div>
      <Suspense
        fallback={
          // Show a loading list UI while the component is loading
          <div className="w-full">
            <div className={`${skeleton} ${activeAndTitles}`} />
            <div className={`${skeleton} ${activeAndTitles}`} />
            <div className={`${skeleton} ${items}`} />
            <div className={`${skeleton} ${items}`} />
            <div className={`${skeleton} ${items}`} />
          </div>
        }
      >
        {/* @ts-expect-error Server Component */}
        <ItemList />
      </Suspense>
    </div>
  );
}
