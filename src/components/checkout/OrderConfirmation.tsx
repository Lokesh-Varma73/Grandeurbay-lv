
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface OrderConfirmationProps {
  orderNumber: string;
}

const OrderConfirmation = ({ orderNumber }: OrderConfirmationProps) => {
  return (
    <div className="text-center py-10 max-w-md mx-auto">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-green-500" size={32} />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Thank You For Your Order!</h1>
      <p className="text-gray-600 mb-6">
        Your order has been placed and is being processed.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="mb-4">
          <span className="text-sm text-gray-600">Order Number:</span>
          <p className="font-medium">{orderNumber}</p>
        </div>
        
        <div className="mb-4">
          <span className="text-sm text-gray-600">Email:</span>
          <p className="font-medium">Your order confirmation has been sent to your email.</p>
        </div>
        
        <div>
          <span className="text-sm text-gray-600">Estimated Delivery:</span>
          <p className="font-medium">5-7 business days</p>
        </div>
      </div>
      
      <Link to="/">
        <Button>
          Continue Shopping
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
