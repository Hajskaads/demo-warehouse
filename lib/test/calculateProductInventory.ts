import { Article, Product } from '@lib/types';

/**
 * Calculates the available quantity of products based on the provided inventory data and products data.
 * @param {object} inventoryData - The inventory data containing the list of available articles and their stock quantities.
 * @param {object} productsData - The products data containing the list of products and the articles they require.
 * @returns {object[]} - An array of objects representing the products and their available quantities.
 *  Each object has the following properties:
 *  name: string - The name of the product.
 *  quantity: number - The available quantity of the product.
 */
export default function calculateProductInventory(
  inventoryData: { inventory: Article[] },
  productsData: { products: Product[] }
) {
  // Get the inventory data
  const inventory = inventoryData.inventory;

  // Get the products data
  const products = productsData.products;

  // Initialize an array to store the product inventory data
  const productsInventory = [];

  // Iterate over each product
  for (const product of products) {
    // Get the product name
    const productName = product.name;

    // Get the articles required by the product
    const productArticles = product.contain_articles;

    // Initialize the available quantity as infinity
    let availableQuantity = Infinity;

    // Iterate over each article required by the product
    for (const article of productArticles) {
      // Get the article ID
      const articleId = article.art_id;

      // Get the required amount of the article
      const articleAmount = parseInt(article.amount_of, 10);

      // Find the matching article in the inventory
      const matchingInventoryArticle = inventory.find((item: any) => item.art_id === articleId);

      // If the article is not found in the inventory, set the available quantity to 0 and break the loop
      if (!matchingInventoryArticle) {
        availableQuantity = 0;
        break;
      }

      // Get the stock quantity of the article
      const articleStock = parseInt(matchingInventoryArticle.stock, 10);

      // Calculate the required quantity based on the stock and required amount
      const requiredQuantity = Math.floor(articleStock / articleAmount);

      // Update the available quantity if the required quantity is lower
      if (requiredQuantity < availableQuantity) {
        availableQuantity = requiredQuantity;
      }
    }

    // Add the product and its available quantity to the productsInventory array
    productsInventory.push({
      name: productName,
      quantity: availableQuantity,
    });
  }

  // Return the calculated product inventory
  return productsInventory;
}
