
import { Minus, Plus } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductQuantity = ({ quantity, setQuantity }: ProductQuantityProps) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Quantity</h3>
      <div className="flex items-center border border-gray-200 rounded-md w-fit">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors disabled:opacity-50"
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center text-sm">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductQuantity;
