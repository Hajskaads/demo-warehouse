import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@lib/types';
import prisma from '@lib/prisma';

/**
 *
 * POST endpoint to update inventory.
 * This function receives a request containing an inventory JSON and updates the inventory in the database.
 *
 * @param req {NextRequest} - The incoming request object containing the inventory JSON.
 * @returns {Promise<NextResponse>} The response indicating the status of the inventory update.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { inventory } = await req.json();

  // Validate the JSON structure
  if (!inventory) {
    return NextResponse.json(
      { error: 'Invalid JSON structure. "inventory" field is missing.' },
      { status: 400 }
    );
  }

  if (!inventory.length) {
    return NextResponse.json(
      { error: 'Invalid JSON data. "inventory" field is empty.' },
      { status: 400 }
    );
  }

  try {
    for (const item of inventory) {
      // Check that the values of the JSON are inline with the expected data
      // Two constraints are also imposed: art_id must be a positive number, and stock has to be 0 or a positive number
      if (
        typeof item.art_id !== 'string' ||
        typeof item.stock !== 'string' ||
        !Number.isInteger(Number(item.art_id)) ||
        !Number.isInteger(Number(item.stock)) ||
        Number(item.art_id) <= 0 ||
        Number(item.stock) < 0
      ) {
        return NextResponse.json(
          { error: 'Invalid JSON structure. "art_id" and "stock" should be positive integers.' },
          { status: 400 }
        );
      }
    }

    // Perform a transaction for bulk operation
    await prisma.$transaction(async (prisma) => {
      const upsertArticlesPromises = inventory.map((article: Article) =>
        // In case the article exists, and the one to be uploaded has the same art_id, sum that stock value to the stock in the DB. Else, create a new article
        prisma.articles.upsert({
          where: { art_id: +article.art_id },
          update: { stock: { increment: +article.stock } },
          create: {
            art_id: +article.art_id,
            name: article.name,
            stock: +article.stock,
          },
        })
      );

      await Promise.all(upsertArticlesPromises);
    });

    return NextResponse.json({ status: 204 });
  } catch (e: any) {
    // Handle specific error scenarios
    if (
      e.message ===
      '\nInvalid `prisma.articles.create()` invocation:\n\n\nUnique constraint failed on the fields: (`name`)'
    ) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
    console.log('e', e);

    // Handle any other specific error case scenario here. Otherwise, return error 500.
    return NextResponse.json({ status: 500 });
  }
}
