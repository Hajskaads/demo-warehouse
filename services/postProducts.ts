import { Product } from '@lib/types';

export default async function postProducts(productsData: Product[]): Promise<any> {
  const requestOptions: RequestInit = {
    method: 'POST',
    body: JSON.stringify(productsData),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response: Response = await fetch(`/api/products`, requestOptions);

  // Parse the response data
  const data: any = await response.json();
  return data;
}
