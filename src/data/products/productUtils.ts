
import { Product } from "@/types/product";
import { products } from "./productData";

// Function to get a product by ID
export const getProductById = (id: string): Product | null => {
  const productId = parseInt(id, 10);
  return products.find(product => product.id === productId) || null;
};

// Function to get related products (products in the same category)
export const getRelatedProducts = (product: Product): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4); // Return up to 4 related products
};

// Function to get featured products
export const getFeaturedProducts = (): Product[] => {
  // For demo purposes, let's return a subset of products as featured
  return products.slice(0, 6);
};

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};
