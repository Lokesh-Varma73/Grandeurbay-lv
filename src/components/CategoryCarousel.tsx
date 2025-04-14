
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Category = {
  id: string;
  name: string;
  image: string;
  link: string;
};

const categories: Category[] = [
  {
    id: 'men',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1587&auto=format&fit=crop',
    link: '/category/men'
  },
  {
    id: 'women',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471&auto=format&fit=crop',
    link: '/category/women'
  },
  {
    id: 'kids',
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1472&auto=format&fit=crop',
    link: '/category/kids'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop',
    link: '/category/shoes'
  },
  {
    id: 'perfumes',
    name: 'Perfumes',
    image: 'https://images.unsplash.com/photo-1592945403407-9cefa6648746?q=80&w=1470&auto=format&fit=crop',
    link: '/category/perfumes'
  },
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1580171401354-31d5df61e8b7?q=80&w=1450&auto=format&fit=crop',
    link: '/category/sunglasses'
  },
  {
    id: 'shirts',
    name: 'Shirts',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=1471&auto=format&fit=crop',
    link: '/category/shirts'
  },
  {
    id: 'pants',
    name: 'Pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1470&auto=format&fit=crop',
    link: '/category/pants'
  }
];

export function CategoryCarousel() {
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Calculate max scroll position
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth;
      const clientWidth = sliderRef.current.clientWidth;
      setMaxScroll(scrollWidth - clientWidth);
    }
    
    return () => clearTimeout(timer);
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth / 2;
      const newPosition = direction === 'left' 
        ? Math.max(scrollPosition - scrollAmount, 0)
        : Math.min(scrollPosition + scrollAmount, maxScroll);
      
      sliderRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };
  
  const handleScroll = () => {
    if (sliderRef.current) {
      setScrollPosition(sliderRef.current.scrollLeft);
    }
  };

  return (
    <div className="relative py-8 md:py-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-display">Shop by Category</h2>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => scroll('left')} 
              className={cn(
                "p-2 border rounded-full transition-all",
                scrollPosition <= 0 
                  ? "text-gray-300 border-gray-200 cursor-not-allowed" 
                  : "text-gray-800 border-gray-300 hover:bg-gray-50"
              )}
              disabled={scrollPosition <= 0}
              aria-label="Scroll left"
            >
              <ArrowLeft size={18} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className={cn(
                "p-2 border rounded-full transition-all",
                scrollPosition >= maxScroll 
                  ? "text-gray-300 border-gray-200 cursor-not-allowed" 
                  : "text-gray-800 border-gray-300 hover:bg-gray-50"
              )}
              disabled={scrollPosition >= maxScroll}
              aria-label="Scroll right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-none scroll-smooth pb-6 -mx-4 px-4"
          onScroll={handleScroll}
        >
          <div className="flex space-x-4">
            {loading ? (
              // Skeleton loaders
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="flex-none w-36 md:w-64">
                  <Skeleton className="h-48 md:h-80 rounded-xl mb-3" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
              ))
            ) : (
              // Actual categories
              categories.map((category) => (
                <Link 
                  key={category.id}
                  to={category.link} 
                  className="flex-none w-36 md:w-64 group"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-3 shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                      <h3 className="text-lg md:text-xl font-bold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCarousel;
