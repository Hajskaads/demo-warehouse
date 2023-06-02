// import { NextResponse } from 'next/server';

import { ProductStockResponse } from '@lib/types';

export default async function getProductStock(): Promise<ProductStockResponse> {
  const response: Response = await fetch(process.env.NEXT_PUBLIC_URL + `/api/products`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data: ProductStockResponse = await response.json();
  return data;
}
