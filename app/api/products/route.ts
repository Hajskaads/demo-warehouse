import { NextRequest, NextResponse } from 'next/server';
import { ContainingArticle, Product, ProductStock } from '@lib/types';
import prisma from '@lib/prisma';

/**
 * GET endpoint to fetch available products.
 *
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object.
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Query available products with a minimum stock requirement for each article
    const availableProductsRaw = await prisma.products.findMany({
      where: {
        contain_articles: {
          every: {
            articles: {
              stock: {
                gte: 1, // Minimum stock required for each article
              },
            },
          },
        },
      },
      include: {
        contain_articles: {
          include: {
            articles: true,
          },
        },
      },
    });

    // Map and calculate the available stock for each product
    const availableProducts: ProductStock[] = availableProductsRaw.map((product: any) => {
      // Calculate the minimum stock based on the articles' stock and quantity
      const stock = product.contain_articles.reduce((minStock: any, containArticle: any) => {
        const { articles, amount_of } = containArticle;
        return Math.min(minStock, Math.floor(articles.stock / amount_of));
      }, Infinity);

      return {
        id: product.id,
        name: product.name,
        stock: stock,
      };
    });
    // Return the available products
    return NextResponse.json({ availableProducts }, { status: 200 });
  } catch (e: any) {
    // Handle specific error scenarios
    if (e.message === `relation "products" does not exist.`) {
      return NextResponse.json(
        { message: 'Table does not exist, please click on Restore DBs.' },
        { status: e.status }
      );
    }
    // ...

    // Handle any other error case scenario
    return NextResponse.json({ status: 500 });
  }
}

/**
 * POST endpoint to create products and articlesToProducts relationships.
 *
 * @param req {NextRequest} - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 */
export async function POST(req: NextRequest): Promise<Response> {
  const {
    products,
  }: {
    products: Product[];
  } = await req.json();

  // Validate the JSON structure
  if (!products) {
    return NextResponse.json(
      { error: 'Invalid JSON structure. "products" field is missing.' },
      { status: 400 }
    );
  }

  if (!products.length) {
    return NextResponse.json(
      { error: 'Invalid JSON data. "products" field is empty.' },
      { status: 400 }
    );
  }

  // Validate the product structure and article data
  for (const product of products) {
    if (typeof product.name !== 'string' || !Array.isArray(product.contain_articles)) {
      return NextResponse.json(
        {
          error:
            'Invalid product structure. "name" property should be a string and "contain_articles" property should be an array.',
        },
        { status: 400 }
      );
    }

    for (const article of product.contain_articles) {
      if (
        typeof article.art_id !== 'string' ||
        typeof article.amount_of !== 'string' ||
        !Number.isInteger(Number(article.art_id)) ||
        !Number.isInteger(Number(article.amount_of)) ||
        Number(article.art_id) <= 0 ||
        Number(article.amount_of) <= 0
      ) {
        return NextResponse.json(
          {
            error: 'Invalid JSON structure. "art_id" and "amount_of" should be positive integers.',
          },
          { status: 400 }
        );
      }
    }
  }

  try {
    // Perform a transaction for bulk operations
    await prisma.$transaction(async (prisma: any) => {
      // Create products and articlesToProduct relationships based on the JSON data
      const createProductPromises = products.map(async (product: Product) => {
        const { name, contain_articles } = product;

        // Create the product
        const createdProduct = await prisma.products.create({
          data: {
            name,
          },
        });

        // Create the articlesToProduct relationships for the product
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
    });

    return NextResponse.json({ status: 204 });
  } catch (e) {
    // Handle specific error scenarios
    // ...
    console.log('e', e);

    // Handle any other specific error case scenario here. Otherwise, return error 500.
    return NextResponse.json({ status: 500 });
  }
}
