
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { convertToINR, formatINR } from '@/utils/currency';

interface CheckoutSummaryProps {
  onProceed: () => void;
}

const CheckoutSummary = ({ onProceed }: CheckoutSummaryProps) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some products to your cart and come back to checkout.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="py-4 px-4 text-left">Product</th>
              <th className="py-4 px-4 text-left">Price</th>
              <th className="py-4 px-4 text-left">Quantity</th>
              <th className="py-4 px-4 text-left">Total</th>
              <th className="py-4 px-4 text-left sr-only">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <IndianRupee size={14} className="mr-1" />
                    {formatINR(convertToINR(item.price))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center border border-gray-200 rounded-full w-fit">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <IndianRupee size={14} className="mr-1" />
                    {formatINR(convertToINR(item.price * item.quantity))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between mt-8">
        <Link to="/">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
        <Button onClick={onProceed} className="bg-indigo-600 hover:bg-indigo-700">
          Proceed to Shipping
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
