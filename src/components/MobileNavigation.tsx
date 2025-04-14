
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const MobileNavigation = () => {
  const { cartItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Helper function to determine if a route is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  // Function to get user's initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center p-2",
            isActive('/') 
              ? "text-indigo-600 dark:text-indigo-400 font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          )}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
          {isActive('/') && <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 absolute bottom-1 rounded-full"></span>}
        </Link>
        
        <Link 
          to="/products" 
          className={cn(
            "flex flex-col items-center p-2",
            isActive('/products') 
              ? "text-indigo-600 dark:text-indigo-400 font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          )}
        >
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
          {isActive('/products') && <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 absolute bottom-1 rounded-full"></span>}
        </Link>
        
        <Link 
          to="/cart" 
          className={cn(
            "flex flex-col items-center p-2 relative",
            isActive('/cart') || isActive('/checkout')
              ? "text-indigo-600 dark:text-indigo-400 font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          )}
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
          {(isActive('/cart') || isActive('/checkout')) && <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 absolute bottom-1 rounded-full"></span>}
        </Link>
        
        <Link 
          to="/wishlist" 
          className={cn(
            "flex flex-col items-center p-2",
            isActive('/wishlist') 
              ? "text-indigo-600 dark:text-indigo-400 font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          )}
        >
          <Heart size={20} />
          <span className="text-xs mt-1">Wishlist</span>
          {isActive('/wishlist') && <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 absolute bottom-1 rounded-full"></span>}
        </Link>
        
        <Link 
          to="/account" 
          className={cn(
            "flex flex-col items-center p-2",
            isActive('/account') || isActive('/sign-in') || isActive('/sign-up')
              ? "text-indigo-600 dark:text-indigo-400 font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          )}
        >
          {isAuthenticated && user?.avatarUrl ? (
            <Avatar className="h-5 w-5">
              <AvatarImage src={user.avatarUrl} alt={user.name || 'User'} />
              <AvatarFallback className="text-[8px]">{getInitials()}</AvatarFallback>
            </Avatar>
          ) : (
            <User size={20} />
          )}
          <span className="text-xs mt-1">Account</span>
          {(isActive('/account') || isActive('/sign-in') || isActive('/sign-up')) && <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 absolute bottom-1 rounded-full"></span>}
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
