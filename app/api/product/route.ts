import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

/**
 * DELETE endpoint to delete all articles in a product or products.
 *
 * @param req {NextRequest} - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object.
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const productId = Number(searchParams.get('id'));
  const quantity = Number(searchParams.get('quantity'));
  let productQuantity: number = quantity ? quantity : 1;

  // Ensure that the given productId exists before proceeding
  if (!productId) {
    return NextResponse.json({ error: 'Missing productId!' }, { status: 400 });
  }
  try {
    // Perform the finding and update within a transaction to ensure atomicity
    await prisma.$transaction(async (prismaClient) => {
      // Fetch the product from the database using the productId
      const product = await prisma.products.findUnique({
        where: {
          id: +productId,
        },
        include: {
          contain_articles: true,
        },
      });

      // Ensure that the product exists before proceeding
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 400 });
      }
      // Create an empty array with the articles to be deleted
      const articlesToDelete: { articleId: number; amount: number }[] = [];

      /*
       * Calculate the new stock for each article in the product
       * and ensure it doesn't result in negative stock
       */
      for (const containArticle of product.contain_articles) {
        const { art_id, amount_of } = containArticle;

        // Fetch the article from the database using art_id
        const article = await prisma.articles.findUnique({
          where: {
            art_id: art_id,
          },
        });

        // Ensure that the article exists before proceeding
        if (!article) {
          return NextResponse.json(
            { error: `Article with ID ${art_id} not found` },
            { status: 400 }
          );
        }

        // Calculate the new article stock
        const newStock = article.stock - amount_of * productQuantity;

        // If the new stock would be negative, cancel the operation
        if (newStock < 0) {
          return NextResponse.json(
            {
              error: `Deleting product ${productId} would result in negative stock for article ${art_id}. Operation canceled.`,
            },
            { status: 400 }
          );
        }

        // Store the articles to be deleted and their respective quantities
        articlesToDelete.push({ articleId: art_id, amount: amount_of });
      }

      // Update the stock for each article to be deleted
      for (const { articleId, amount } of articlesToDelete) {
        await prismaClient.articles.update({
          where: { art_id: articleId },
          data: { stock: { decrement: amount } },
        });
      }

      console.log(`Deleted articles for product: ${product.name}`);
    });

    return NextResponse.json({ status: 204 });
  } catch (e: any) {
    // Handle specific error scenarios
    // ...
    console.log('e', e);

    // Handle any other specific error case scenario here. Otherwise, return error 500.
    return NextResponse.json({ status: 500 });
  }
}
