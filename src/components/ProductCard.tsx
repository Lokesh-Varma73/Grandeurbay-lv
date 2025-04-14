
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { convertToINR, formatINR } from '@/utils/currency';

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  gender?: string;
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const inWishlist = isInWishlist(product.id);

  const handleImageChange = () => {
    if (product.images.length > 1) {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product as any); // Using any type here as we're passing from ProductCard to full Product
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group block relative overflow-hidden rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl",
        featured ? "aspect-[4/5]" : "aspect-[3/4]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      {/* Product Image */}
      <div 
        className="w-full h-full image-shine"
        onMouseEnter={handleImageChange}
        onMouseLeave={handleImageChange}
      >
        <img 
          src={product.images[currentImage]} 
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
      </div>
      
      {/* Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
      
      {/* Quick Actions */}
      <div className={cn(
        "absolute top-4 right-4 flex flex-col space-y-2 transform transition-all duration-300",
        isHovered ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      )}>
        <button 
          onClick={handleWishlist}
          className={cn(
            "w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all",
            inWishlist 
              ? "bg-red-500/90 text-white hover:bg-red-600" 
              : "bg-white/90 text-black hover:bg-white"
          )}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
        </button>
        <button 
          onClick={handleAddToCart}
          className="w-12 h-12 rounded-full bg-black/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black transition-all"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className={cn(
          "transform transition-all duration-300",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <h3 className="text-white font-medium text-lg mb-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IndianRupee size={16} className="text-white/90 mr-1" />
              <span className="text-white/90 font-display text-lg">
                {formatINR(convertToINR(product.price))}
              </span>
            </div>
            <span className="text-white/70 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
