
import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product as ProductType } from '@/types/product';
import { products } from '@/data/products';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import { useToast } from '@/hooks/use-toast';
import CategoryBanner from '@/components/category/CategoryBanner';
import FeatureGallery from '@/components/category/FeatureGallery';
import FilterToolbar from '@/components/category/FilterToolbar';
import FilterSidebar from '@/components/category/FilterSidebar';
import ProductGrid from '@/components/category/ProductGrid';
import { getCategoryDescription, getCategoryBannerImage } from '@/utils/categoryUtils';

interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const { toast } = useToast();
  
  const priceRanges = ["All", "Under ₹2,000", "₹2,000 - ₹5,000", "₹5,000 - ₹10,000", "Above ₹10,000"];
  
  // Get all unique sizes and colors from products
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    allProducts.forEach(product => {
      product.sizes?.forEach(size => sizes.add(size));
    });
    return Array.from(sizes).sort();
  }, [allProducts]);
  
  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    allProducts.forEach(product => {
      product.colors?.forEach(color => colors.add(color));
    });
    return Array.from(colors).sort();
  }, [allProducts]);

  useEffect(() => {
    // Filter products based on the selected category
    let categoryProducts = products;
    
    if (category === 'Men') {
      categoryProducts = products.filter(p => p.gender === 'Men' || p.gender === 'Unisex');
    } else if (category === 'Women') {
      categoryProducts = products.filter(p => p.gender === 'Women' || p.gender === 'Unisex');
    } else if (category === 'Kids') {
      categoryProducts = products.filter(p => p.gender === 'Kids');
    } else if (category === 'Shoes') {
      categoryProducts = products.filter(p => 
        p.category === 'Running' || 
        p.category === 'Lifestyle' || 
        p.category === 'Soccer' || 
        p.category === 'Performance'
      );
    } else if (category === 'Shirts') {
      categoryProducts = products.filter(p => p.category === 'Shirts');
    } else if (category === 'Pants') {
      categoryProducts = products.filter(p => p.category === 'Pants');
    } else if (category === 'Clothing') {
      categoryProducts = products.filter(p => p.category === 'Apparel');
    } else if (category === 'Perfumes') {
      categoryProducts = products.filter(p => p.category === 'Perfumes');
    } else if (category === 'Sunglasses') {
      categoryProducts = products.filter(p => p.category === 'Sunglasses');
    }
    
    setAllProducts(categoryProducts);
    setFilteredProducts(categoryProducts);
  }, [category]);

  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by price range
    if (priceRange !== "All") {
      const convertedPrices = result.map(p => ({ ...p, inrPrice: p.price * 83.12 }));
      
      switch (priceRange) {
        case "Under ₹2,000":
          result = convertedPrices.filter(p => p.inrPrice < 2000);
          break;
        case "₹2,000 - ₹5,000":
          result = convertedPrices.filter(p => p.inrPrice >= 2000 && p.inrPrice <= 5000);
          break;
        case "₹5,000 - ₹10,000":
          result = convertedPrices.filter(p => p.inrPrice >= 5000 && p.inrPrice <= 10000);
          break;
        case "Above ₹10,000":
          result = convertedPrices.filter(p => p.inrPrice > 10000);
          break;
      }
    }
    
    // Filter by selected sizes
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes?.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by selected colors
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors?.some(color => selectedColors.includes(color))
      );
    }
    
    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        // Assuming newest is based on ID for demo purposes
        result.sort((a, b) => b.id - a.id);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured - no specific sort
        break;
    }
    
    setFilteredProducts(result);
  }, [priceRange, sortBy, allProducts, selectedSizes, selectedColors]);

  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const resetFilters = () => {
    setPriceRange("All");
    setSortBy("featured");
    setSelectedSizes([]);
    setSelectedColors([]);
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
    });
  };

  return (
    <>
      <Header />
      
      <main className="pt-20 min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* Hero Banner */}
        <CategoryBanner 
          category={category} 
          description={getCategoryDescription(category)}
          bannerImage={getCategoryBannerImage(category)}
        />
        
        {/* Category Image Gallery */}
        <FeatureGallery category={category} />
        
        {/* Filter Toolbar */}
        <FilterToolbar 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filteredProductsCount={filteredProducts.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <FilterSidebar 
              showFilters={showFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              priceRanges={priceRanges}
              availableSizes={availableSizes}
              selectedSizes={selectedSizes}
              toggleSizeFilter={toggleSizeFilter}
              availableColors={availableColors}
              selectedColors={selectedColors}
              toggleColorFilter={toggleColorFilter}
              resetFilters={resetFilters}
            />
            
            {/* Products Grid */}
            <ProductGrid 
              products={filteredProducts}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
};

export default CategoryPage;
