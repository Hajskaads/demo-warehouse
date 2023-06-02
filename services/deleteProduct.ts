export default async function deleteProduct(productId: string, quantity: number): Promise<any> {
  const response: Response = await fetch(`/api/product?id=${productId}&quantity=${quantity}`, {
    method: 'DELETE',
  });

  // Parse the response data
  const data: any = await response.json();
  return data;
}
