import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import Breadcrumbs from '@/components/product/Breadcrumbs';
import RelatedProducts from '@/components/product/RelatedProducts';
import ProductLoading from '@/components/product/ProductLoading';
import ProductNotFound from '@/components/product/ProductNotFound';
import { Product as ProductType } from '@/types/product';
import { getProductById, getRelatedProducts } from '@/data/products';
import CartDrawer from '@/components/CartDrawer';
import { convertToINR } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const foundProduct = getProductById(id);
        setProduct(foundProduct);
        
        if (foundProduct) {
          const related = getRelatedProducts(foundProduct);
          setRelatedProducts(related);
        }
      }
      
      setLoading(false);
    }, 300);
    
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return <ProductLoading />;
  }
  
  if (!product) {
    return <ProductNotFound />;
  }
  
  return (
    <>
      <Header />
      
      <main className="bg-gradient-to-b from-indigo-50 to-white pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4">
            <Link to="/products">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
        
        <Breadcrumbs category={product.category} productName={product.name} />
        
        <section className="container mx-auto py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ProductImageGallery images={product.images} productName={product.name} />
            <ProductInfo product={{
              ...product,
              price: convertToINR(product.price)
            }} />
          </div>
        </section>
        
        <RelatedProducts products={relatedProducts} />
      </main>
      
      <Footer />
      <CartDrawer />
    </>
  );
};

export default Product;
