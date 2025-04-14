
import { useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, IndianRupee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { convertToINR, formatINR } from '@/utils/currency';

const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
  } = useCart();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity animate-fade-in"
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 max-w-full bg-gradient-to-br from-indigo-900 to-purple-800 text-white shadow-xl z-50 transform transition-transform duration-300",
          isCartOpen ? "translate-x-0 animate-slide-in-right" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 px-6 py-4">
          <h2 className="text-xl font-display font-semibold">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="text-white/70 hover:text-white transition-colors rounded-full bg-white/10 p-2"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="h-[calc(100vh-170px)] overflow-y-auto py-6 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-white/30 mb-4" />
              <p className="text-white/70 mb-2">Your cart is empty</p>
              <button 
                onClick={closeCart}
                className="text-sm font-medium text-white hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="h-20 w-20 rounded-xl bg-white/10 overflow-hidden flex-shrink-0 border border-white/20">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.name}</h3>
                      <div className="flex items-center mb-2">
                        <IndianRupee size={14} className="mr-1 text-white/70" />
                        <p className="text-sm text-white/70">{formatINR(convertToINR(item.price))}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/20 rounded-full w-fit bg-white/5 overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/40 hover:text-white transition-colors rounded-full bg-white/5 p-1 hover:bg-white/10"
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-white/20 px-6 py-4 bg-black/20 backdrop-blur-sm absolute bottom-0 left-0 right-0">
            <div className="flex justify-between mb-4">
              <span className="text-white/70">Subtotal</span>
              <div className="flex items-center">
                <IndianRupee size={16} className="mr-1" />
                <span className="font-medium">{formatINR(convertToINR(getTotalPrice()))}</span>
              </div>
            </div>
            <p className="text-xs text-white/50 mb-4">Shipping and taxes calculated at checkout</p>
            <div className="space-y-2">
              <Link 
                to="/checkout" 
                onClick={closeCart}
                className="block w-full bg-white text-purple-900 py-3 rounded-full hover:bg-white/90 transition-colors text-center font-medium"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
