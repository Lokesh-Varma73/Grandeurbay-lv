
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product as ProductType } from '@/types/product';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Filter, X } from 'lucide-react';

const categories = ["All", "Running", "Lifestyle", "Performance", "Casual", "Apparel", "Accessories", "Outdoor", "Soccer", "Fitness", "Sandals", "Perfumes", "Sunglasses"];
const genders = ["All", "Men", "Women", "Unisex"];
const priceRanges = ["All", "Under ₹2,000", "₹2,000 - ₹5,000", "₹5,000 - ₹10,000", "Above ₹10,000"];

const Products = () => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get all products
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    let result = [...allProducts];
    
    // Filter by category
    if (category !== "All") {
      result = result.filter(product => product.category === category);
    }
    
    // Filter by gender
    if (gender !== "All") {
      result = result.filter(product => product.gender === gender);
    }
    
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
      default: // featured - no specific sort
        break;
    }
    
    setFilteredProducts(result);
  }, [category, gender, priceRange, sortBy, allProducts]);

  const resetFilters = () => {
    setCategory("All");
    setGender("All");
    setPriceRange("All");
    setSortBy("featured");
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
        <div className="relative h-64 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1400&auto=format&fit=crop')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}></div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl text-white font-display font-bold">Premium Collection</h1>
            <p className="text-white/80 mt-2 md:mt-4 max-w-xl">
              Explore our collection of premium products, designed to enhance your performance and style.
            </p>
          </div>
        </div>
        
        {/* Filter Toolbar */}
        <div className="sticky top-20 z-20 bg-white shadow-md py-3 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden mr-2"
                >
                  {showFilters ? <X size={18} /> : <Filter size={18} />}
                  {showFilters ? "Hide" : "Filters"}
                </Button>
                
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> products
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-700">Sort by:</label>
                <select 
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={category === cat}
                          onChange={() => setCategory(cat)}
                          className="mr-2"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Gender Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Gender</h3>
                  <div className="space-y-2">
                    {genders.map((gen) => (
                      <label key={gen} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          checked={gender === gen}
                          onChange={() => setGender(gen)}
                          className="mr-2"
                        />
                        <span className="text-sm">{gen}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={priceRange === range}
                          onChange={() => setPriceRange(range)}
                          className="mr-2"
                        />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
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
          </div>
        </div>
      </main>
      
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
};

export default Products;
