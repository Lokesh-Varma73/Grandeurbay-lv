
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CategoryBannerProps {
  category: string;
  description: string;
  bannerImage: string;
}

const CategoryBanner = ({ category, description, bannerImage }: CategoryBannerProps) => {
  return (
    <div className="relative h-80 md:h-96 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-40" 
        style={{ 
          backgroundImage: `url('${bannerImage}')`, 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <h1 className="text-4xl md:text-5xl text-white font-display font-bold mb-2">{category} Collection</h1>
        <p className="text-white/90 mt-2 md:mt-4 max-w-xl text-lg">
          {description}
        </p>
        <div className="mt-6">
          <Button variant="default" className="bg-white text-indigo-600 hover:bg-white/90 border-none">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
