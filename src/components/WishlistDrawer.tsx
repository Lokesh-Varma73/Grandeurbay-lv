
import { ShoppingBag, X, Heart, TrashIcon, IndianRupee, Share2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { convertToINR, formatIndianCurrency } from '@/utils/currency';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const WishlistDrawer = () => {
  const { wishlistItems, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleShareWishlist = () => {
    // Create a shareable link (in a real app, this would create a unique URL)
    const shareableUrl = `${window.location.origin}/shared-wishlist?items=${wishlistItems.map(item => item.id).join(',')}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableUrl).then(() => {
      toast({
        title: "Wishlist link copied",
        description: "Share this link with your friends to show your wishlist",
      });
    });
  };
  
  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    
    wishlistItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.images[0],
        quantity: 1
      });
    });
    
    toast({
      title: "Items added to cart",
      description: `${wishlistItems.length} items have been added to your cart`,
    });
  };
  
  // Filter items based on active tab
  const filteredItems = wishlistItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });
  
  // Get unique categories from wishlist items
  const categories = ['all', ...new Set(wishlistItems.map(item => item.category.toLowerCase()))];

  return (
    <Sheet open={isWishlistOpen} onOpenChange={closeWishlist}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-gradient-to-br from-indigo-900 to-purple-800 text-white border-l border-white/20">
        <SheetHeader className="relative mb-4">
          <SheetTitle className="text-center text-white">My Wishlist</SheetTitle>
          <button
            onClick={closeWishlist}
            className="absolute right-0 top-0 rounded-full bg-white/10 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 text-white"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </SheetHeader>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <Heart className="h-16 w-16 text-white/30" />
            <p className="text-lg font-medium text-white/80">Your wishlist is empty</p>
            <p className="text-sm text-white/60 text-center max-w-xs">
              Add items to your wishlist to save them for later
            </p>
            <Button 
              className="mt-4 bg-white/20 hover:bg-white/30 text-white border border-white/30" 
              variant="outline" 
              onClick={closeWishlist}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 px-3 py-1">
                {wishlistItems.length} items
              </Badge>
              
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs bg-white/10 hover:bg-white/20 text-white"
                  onClick={handleShareWishlist}
                >
                  <Share2 className="mr-1 h-3 w-3" />
                  Share
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs bg-white/10 hover:bg-white/20 text-white"
                  onClick={handleAddAllToCart}
                >
                  <ShoppingBag className="mr-1 h-3 w-3" />
                  Add All to Cart
                </Button>
              </div>
            </div>
            
            {categories.length > 1 && (
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="bg-white/10 grid grid-flow-col auto-cols-fr">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="data-[state=active]:bg-white/20 text-white data-[state=active]:text-white capitalize"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
            
            <Separator className="bg-white/10" />
            
            {filteredItems.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-white/70">No items in this category</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/product/${item.id}`}
                      className="text-sm font-medium hover:underline"
                      onClick={closeWishlist}
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-white/60">{item.category}</p>
                    <div className="flex items-center mt-1">
                      <IndianRupee size={14} className="text-white/70 mr-1" />
                      <p className="text-sm font-semibold">{formatIndianCurrency(convertToINR(item.price))}</p>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 text-xs bg-white/10 hover:bg-white/20 text-white border border-white/30"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingBag className="mr-1 h-3 w-3" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-500/10"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <TrashIcon className="mr-1 h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {wishlistItems.length > 0 && (
          <SheetFooter className="mt-6">
            <Button 
              className="w-full bg-white hover:bg-white/90 text-purple-900" 
              onClick={closeWishlist}
            >
              Continue Shopping
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
