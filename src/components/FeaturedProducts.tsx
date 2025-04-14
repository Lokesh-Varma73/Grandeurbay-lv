
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard, Product } from './ProductCard';
import { Link } from 'react-router-dom';

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Ultraboost 21",
    price: 180,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1450&auto=format&fit=crop"
    ],
    category: "Running",
    gender: "Men",
    colors: ["Black", "White", "Gray"]
  },
  {
    id: 2,
    name: "NMD R1",
    price: 140,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1431&auto=format&fit=crop"
    ],
    category: "Casual",
    gender: "Unisex",
    colors: ["White", "Black", "Blue"]
  },
  {
    id: 3,
    name: "Stan Smith",
    price: 90,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Lifestyle",
    gender: "Unisex",
    colors: ["White", "Green", "Navy"]
  },
  {
    id: 4,
    name: "Superstar",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603787081207-362bcef7c144?q=80&w=1469&auto=format&fit=crop"
    ],
    category: "Lifestyle",
    gender: "Unisex",
    colors: ["White", "Black", "Gold"]
  },
  {
    id: 5,
    name: "Adizero Adios Pro",
    price: 220,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1429&auto=format&fit=crop"
    ],
    category: "Performance",
    gender: "Men",
    colors: ["Orange", "Blue", "Black"]
  },
  {
    id: 6,
    name: "Tiro Track Jacket",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617952236317-203a737aa970?q=80&w=1471&auto=format&fit=crop"
    ],
    category: "Apparel",
    gender: "Men",
    colors: ["Black", "Navy", "Red"]
  }
];

const categories = ["All", "Running", "Lifestyle", "Performance", "Casual", "Apparel"];

export const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-20">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Collection</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">Featured Products</h2>
          </div>
          <Link to="/products" className="inline-flex items-center mt-4 md:mt-0 text-sm font-medium group">
            View All Products
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category 
                  ? "bg-black text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Featured Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-gray-100 rounded-lg overflow-hidden relative aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1470&auto=format&fit=crop" 
              alt="Featured Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <span className="text-white/80 text-sm font-medium">New Collection</span>
              <h3 className="text-white text-2xl md:text-3xl font-display font-bold mt-2 mb-4">Summer Essentials</h3>
              <Link to="/products?category=Summer">
                <button className="bg-white text-black px-6 py-2 rounded-full w-fit hover:bg-white/90 transition-all">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden relative aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1469&auto=format&fit=crop" 
              alt="Featured Collection"
              className="w-full h-full object-cover mix-blend-overlay opacity-90"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="text-white/80 text-sm font-medium">Limited Edition</span>
              <h3 className="text-white text-2xl md:text-3xl font-display font-bold mt-2 mb-4">Performance Series</h3>
              <Link to="/products?category=Performance">
                <button className="bg-white text-black px-6 py-2 rounded-full w-fit hover:bg-white/90 transition-all">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
