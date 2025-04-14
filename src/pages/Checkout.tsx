
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/context/CartContext';
import { CheckCircle, ArrowLeft, IndianRupee } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavigation from '@/components/MobileNavigation';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import { convertToINR, formatINR } from '@/utils/currency';

const steps = ['Cart Review', 'Shipping', 'Payment', 'Confirmation'] as const;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  
  // If cart is empty, redirect to homepage
  if (cartItems.length === 0 && currentStep !== 3) {
    navigate('/');
  }
  
  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handlePlaceOrder = () => {
    // Generate a random order number
    const newOrderNumber = `AD-${Math.floor(Math.random() * 1000000)}`;
    setOrderNumber(newOrderNumber);
    clearCart();
    nextStep();
  };
  
  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-10 min-h-[calc(100vh-200px)] mb-16 lg:mb-0">
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex flex-1 items-center">
                <div 
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                    index === currentStep 
                      ? 'bg-indigo-600 text-white'
                      : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                <div className={`flex-1 h-1 mx-2 ${
                  index < steps.length - 1 
                    ? index < currentStep 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                    : 'hidden'
                }`} />
                
                <span className={`hidden sm:block text-sm ${
                  index === currentStep 
                    ? 'text-indigo-600 font-medium'
                    : index < currentStep
                      ? 'text-green-500'
                      : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Back Button */}
        {currentStep > 0 && currentStep < 3 && (
          <button 
            onClick={prevStep}
            className="flex items-center text-sm mb-6 hover:underline text-indigo-600"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to {steps[currentStep - 1]}
          </button>
        )}
        
        {/* Step Content */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            {currentStep === 0 && (
              <CheckoutSummary onProceed={nextStep} />
            )}
            
            {currentStep === 1 && (
              <ShippingForm onProceed={nextStep} />
            )}
            
            {currentStep === 2 && (
              <PaymentForm onPaymentSuccess={handlePlaceOrder} />
            )}
            
            {currentStep === 3 && (
              <OrderConfirmation orderNumber={orderNumber} />
            )}
          </div>
          
          {/* Order Summary - Only show for steps 0-2 */}
          {currentStep < 3 && (
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl sticky top-32 border border-indigo-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-6 text-indigo-900">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <div className="flex items-center">
                          <IndianRupee size={12} className="mr-0.5" />
                          <p className="text-sm">{formatINR(convertToINR(item.price))}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-indigo-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-indigo-800">Subtotal</span>
                    <div className="flex items-center">
                      <IndianRupee size={14} className="mr-0.5" />
                      <span>{formatINR(convertToINR(getTotalPrice()))}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-800">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-800">Tax</span>
                    <div className="flex items-center">
                      <IndianRupee size={14} className="mr-0.5" />
                      <span>{formatINR(convertToINR(getTotalPrice() * 0.08))}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-indigo-200 text-indigo-900">
                    <span>Total</span>
                    <div className="flex items-center">
                      <IndianRupee size={14} className="mr-0.5" />
                      <span>{formatINR(convertToINR(getTotalPrice() * 1.08))}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <MobileNavigation />
    </>
  );
};

export default Checkout;
