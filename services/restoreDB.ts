export default async function restoreDB(): Promise<any> {
  const response: Response = await fetch(`/api/restore-db`, { method: 'GET' });

  // Parse the response data
  const data: any = await response.json();
  return data;
}
