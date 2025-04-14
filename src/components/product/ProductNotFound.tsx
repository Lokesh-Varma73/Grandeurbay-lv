
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProductNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-black"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Home
      </button>
    </div>
  );
};

export default ProductNotFound;
