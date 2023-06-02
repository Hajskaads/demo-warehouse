/**
 * Represents an Article.
 */
export type Article = {
  art_id: string;
  name: string;
  stock: string;
};

/**
 * Represents an Article contained within a Product.
 */
export type ContainingArticle = {
  art_id: string;
  amount_of: string;
};

/**
 * Represents a Product.
 */
export type Product = {
  name: string;
  contain_articles: ContainingArticle[];
};

/**
 * Represents the stock of a Product.
 */
export type ProductStock = {
  id: number;
  name: string;
  stock: number;
};

/**
 * Represents the stock of a Product.
 */
export type ProductStockResponse = {
  availableProducts: ProductStock[];
  // TODO: Comprobar el error type
  error?: any;
};
