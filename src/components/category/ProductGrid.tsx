
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product as ProductType } from '@/types/product';

interface ProductGridProps {
  products: ProductType[];
  resetFilters: () => void;
}

const ProductGrid = ({ products, resetFilters }: ProductGridProps) => {
  return (
    <div className="flex-1">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
          <Button onClick={resetFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
