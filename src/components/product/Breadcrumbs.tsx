
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  productName: string;
}

const Breadcrumbs = ({ category, productName }: BreadcrumbsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center text-sm text-gray-500">
        <button onClick={() => navigate('/')} className="hover:text-black transition-colors">
          Home
        </button>
        <ChevronRight size={14} className="mx-2" />
        <button onClick={() => navigate('/category/' + category.toLowerCase())} className="hover:text-black transition-colors">
          {category}
        </button>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-black">{productName}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
