import { Article, ContainingArticle, Product } from '@lib/types';
import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import productsData from '@data/products.json';
import inventoryData from '@data/inventory.json';

/**
 * GET endpoint to restore default values in the database.
 * This function erases all content in the database and creates JSON content in the database based on provided JSON files.
 *
 * @returns {Promise<NextResponse>} The response indicating the status of the database restoration.
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Erase all content in the DB.

    await prisma.articlesToProduct.deleteMany(); // Delete all rows from the articlesToProduct table
    await prisma.products.deleteMany(); // Delete all rows from the products table
    await prisma.articles.deleteMany(); // Delete all rows from the articles table

    // Create JSON content in DB

    // Upsert the articles default values
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

    await Promise.all(upsertArticlesPromises);

    // Create products and articlesToProduct relationships based on the products JSON
    const createProductPromises = productsData.products.map(async (product: Product) => {
      const { name, contain_articles } = product;
      const createdProduct = await prisma.products.create({
        data: {
          name,
        },
      });

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

      await Promise.all(createArticlesToProductPromises);

      return createdProduct;
    });

    await Promise.all(createProductPromises);

    return NextResponse.json(
      { message: 'All DBs were restored to default values provided by the JSON files' },
      { status: 200 }
    );
  } catch (e) {
    // Handle any other specific error case scenario here. Otherwise, return error 500.
    console.log('e', e);

    return NextResponse.json({ status: 500 });
  }
}
