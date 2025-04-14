
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl font-display font-bold mb-8">You Might Also Like</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                images: product.images,
                category: product.category,
                gender: product.gender
              }} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
