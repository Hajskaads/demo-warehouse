import { Product } from '@lib/types';

export default async function postArticles(articlesData: Product[]): Promise<any> {
  const requestOptions: RequestInit = {
    method: 'POST',
    body: JSON.stringify(articlesData),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response: Response = await fetch(`/api/articles`, requestOptions);

  // Parse the response data
  const data: any = await response.json();
  return data;
}
