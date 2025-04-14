
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Search as SearchIcon, User, LogIn } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import CurrencyPreference from './CurrencyPreference';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const categories = [
  { name: 'Men', path: '/category/men' },
  { name: 'Women', path: '/category/women' },
  { name: 'Kids', path: '/category/kids' },
  { name: 'Shoes', path: '/category/shoes' },
  { name: 'Clothing', path: '/category/clothing' },
  { name: 'Perfumes', path: '/category/perfumes' },
  { name: 'Sunglasses', path: '/category/sunglasses' },
  { name: 'Shirts', path: '/category/shirts' },
  { name: 'Pants', path: '/category/pants' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { toggleCart, cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      )}>
        <div className="container mx-auto flex items-center justify-between">
          {/* Brand logo positioned at the leftmost side */}
          <div className="flex-none">
            <Link 
              to="/" 
              className="block z-10 group"
              aria-label="Go to homepage"
            >
              <h1 className={cn(
                "font-playfair font-bold tracking-tight transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-indigo-600",
                isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl",
                "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-600/30 after:to-purple-600/30 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left"
              )}>
                GRANDEURBAY
              </h1>
            </Link>
          </div>

          {/* Navigation separated from brand name */}
          <nav className="hidden md:flex space-x-8 mx-auto">
            {categories.map((category) => (
              <button 
                key={category.name} 
                onClick={() => handleCategoryClick(category.path)}
                className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                {category.name}
              </button>
            ))}
          </nav>

          {/* Right-side icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SearchBar />
            <CurrencyPreference />
            <button 
              className="p-2 text-gray-600 hover:text-black transition-colors relative" 
              aria-label="Wishlist"
              onClick={() => {
                navigate('/wishlist');
              }}
            >
              <Heart size={20} />
            </button>
            
            <UserMenu />
            
            <button 
              className="p-2 text-gray-600 hover:text-black transition-colors relative" 
              aria-label="Cart"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-24 pb-6 px-6 transform transition-transform duration-300 ease-in-out overflow-y-auto",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          <nav className="flex flex-col space-y-6">
            {categories.map((category) => (
              <button 
                key={category.name} 
                onClick={() => handleCategoryClick(category.path)}
                className="text-xl font-medium border-b border-gray-100 dark:border-gray-800 pb-2 text-left flex justify-between items-center"
              >
                {category.name}
                <span className="text-gray-400">→</span>
              </button>
            ))}
            
            {isAuthenticated ? (
              <Link 
                to="/account"
                className="text-xl font-medium border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} className="mr-2" />
                My Account
              </Link>
            ) : (
              <>
                <Link 
                  to="/sign-in"
                  className="text-xl font-medium border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={20} className="mr-2" />
                  Sign In
                </Link>
                <Link 
                  to="/sign-up"
                  className="text-xl font-medium border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} className="mr-2" />
                  Create Account
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 px-6 grid grid-cols-3 gap-4">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/search');
            }}
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300"
          >
            <SearchIcon size={20} />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              toggleCart();
            }}
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 relative"
          >
            <ShoppingBag size={20} />
            <span className="text-xs mt-1">Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-1/3 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate(isAuthenticated ? '/account' : '/sign-in');
            }}
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300"
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
