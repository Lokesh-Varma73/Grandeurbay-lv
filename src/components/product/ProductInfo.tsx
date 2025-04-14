
import { useState } from 'react';
import { Star, Heart, ShoppingBag, ChevronDown, CheckCircle, Truck, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product, CartItemType } from '@/types/product';
import ProductQuantity from './ProductQuantity';
import { formatINR } from '@/utils/currency';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : "");
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [isDescExpanded, setIsDescExpanded] = useState(true);
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (product.colors && !selectedColor) {
      toast({
        title: "Color required",
        description: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    const cartItem: CartItemType = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        {product.isNew && (
          <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
            NEW
          </span>
        )}
        <h1 className="text-3xl font-display font-bold">{product.name}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center mr-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star 
                key={index}
                size={16}
                className={`${
                  index < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-600">{product.reviews} reviews</span>
        </div>
        <div className="mt-2 flex items-center">
          <p className="text-2xl font-display font-bold">{formatINR(product.price)}</p>
          {product.discount && (
            <p className="ml-2 line-through text-gray-500">{formatINR(product.price * (1 + product.discount/100))}</p>
          )}
          {product.discount && (
            <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
      
      {product.colors && (
        <div>
          <h3 className="font-medium mb-2">Color: <span className="text-gray-600">{selectedColor}</span></h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`px-3 py-2 border rounded-md text-sm transition-all ${
                  selectedColor === color 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {product.sizes && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Size: <span className="text-gray-600">{selectedSize}</span></h3>
            <button className="text-sm text-gray-600 hover:text-black transition-colors">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-2 border rounded-md text-sm transition-all ${
                  selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 px-8 rounded-full hover:bg-black/90 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>
        <button 
          onClick={handleWishlistToggle}
          className={`flex-1 sm:flex-none py-3 px-8 rounded-full transition-colors flex items-center justify-center space-x-2 ${
            inWishlist 
              ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
              : 'border border-black hover:bg-gray-50'
          }`}
        >
          <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>
      
      {/* Product benefits */}
      <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <CheckCircle size={18} className="text-green-500 mr-2" />
          <span className="text-sm">In stock & ready to ship</span>
        </div>
        <div className="flex items-center">
          <Truck size={18} className="text-gray-600 mr-2" />
          <span className="text-sm">Free shipping over ₹2,500</span>
        </div>
        <div className="flex items-center">
          <RefreshCw size={18} className="text-gray-600 mr-2" />
          <span className="text-sm">30-day easy returns</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <button 
          className="flex items-center justify-between w-full text-left"
          onClick={() => setIsDescExpanded(!isDescExpanded)}
        >
          <h3 className="font-medium">Description</h3>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isDescExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
        <div className={`mt-2 text-gray-600 overflow-hidden transition-all ${
          isDescExpanded ? 'max-h-screen' : 'max-h-0'
        }`}>
          <p>{product.description}</p>
          
          {product.material && (
            <div className="mt-4">
              <strong className="text-gray-700">Material:</strong> {product.material}
            </div>
          )}
          
          {product.tags && product.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
