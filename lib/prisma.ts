/**
 * Prisma client instance.
 */
import { PrismaClient } from '@prisma/client';

/**
 * Declare the global variable for Prisma client.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma client instance or use the existing global instance
const prisma = global.prisma || new PrismaClient();

// Assign the Prisma client instance to the global variable in development environment
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

// Export the Prisma client instance for use in other files
export default prisma;
