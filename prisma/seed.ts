import prisma from '../lib/prisma';
import productsData from '../data/products.json';
import inventoryData from '../data/inventory.json';
import { Article, ContainingArticle, Product } from '../lib/types';

/**
 * Main function that performs the database operations.
 * This function erases the existing data in the databases and creates new data based on the provided JSON files.
 */
async function main() {
  try {
    // SETP 1: Erase all content in the DBs.

    // Delete all rows from the articlesToProduct table
    await prisma.articlesToProduct.deleteMany();

    // Delete all rows from the products table
    await prisma.products.deleteMany();

    // Delete all rows from the articles table
    await prisma.articles.deleteMany();

    console.log('All Tables successfully erased.');

    // SETP 2: Create JSON content in DB

    // Upsert the articles with default values
    const upsertArticlesPromises = inventoryData.inventory.map((article: Article) =>
      prisma.articles.upsert({
        where: {
          art_id: +article.art_id,
        },
        update: {
          name: article.name,
          stock: +article.stock,
        },
        create: {
          art_id: +article.art_id,
          name: article.name,
          stock: +article.stock,
        },
      })
    );

    const articlePromises = await Promise.all(upsertArticlesPromises);

    const createAllArticlesToProductPromises: any = [];

    // Create the products and articlesToProduct with default values
    const createProductPromises = productsData.products.map(async (product: Product) => {
      const { name, contain_articles } = product;
      const createdProduct = await prisma.products.create({
        data: {
          name,
        },
      });

      // The articlesToProduct table represents product.contain_articles in the JSON
      const createArticlesToProductPromises = contain_articles.map(
        (containArticle: ContainingArticle) =>
          prisma.articlesToProduct.create({
            data: {
              amount_of: +containArticle.amount_of,
              product_id: createdProduct.id,
              art_id: +containArticle.art_id,
            },
          })
      );

      createAllArticlesToProductPromises.push(...createArticlesToProductPromises);

      return createdProduct;
    });

    const productPromises = await Promise.all(createProductPromises);
    const articlesToProductPromises = await Promise.all(createAllArticlesToProductPromises);

    console.log(articlePromises);
    console.log(productPromises);
    console.log(articlesToProductPromises);
  } catch (error) {
    console.error('Error executing database operations:', error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
