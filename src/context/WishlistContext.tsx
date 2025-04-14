
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  isWishlistOpen: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: () => void;
  closeWishlist: () => void;
  clearWishlist: () => void;
  moveAllToCart: () => void;
  getWishlistItemsCount: () => number;
  getWishlistByCategory: (category: string) => Product[];
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { toast } = useToast();

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems(prev => [...prev, product]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const removeFromWishlist = (productId: number) => {
    const product = wishlistItems.find(item => item.id === productId);
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    
    if (product) {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = () => {
    setIsWishlistOpen(prev => !prev);
  };

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  };
  
  const clearWishlist = () => {
    if (wishlistItems.length > 0) {
      setWishlistItems([]);
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist",
      });
    }
  };
  
  const moveAllToCart = () => {
    // This is just a stub - the actual functionality is implemented in the WishlistDrawer component
    // since it needs access to the CartContext as well
    if (wishlistItems.length > 0) {
      toggleWishlist();
    }
  };
  
  const getWishlistItemsCount = () => {
    return wishlistItems.length;
  };
  
  const getWishlistByCategory = (category: string) => {
    if (category === 'all') return wishlistItems;
    return wishlistItems.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      isWishlistOpen,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      closeWishlist,
      clearWishlist,
      moveAllToCart,
      getWishlistItemsCount,
      getWishlistByCategory
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
