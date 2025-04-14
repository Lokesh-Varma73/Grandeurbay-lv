
import { Card, CardContent } from "@/components/ui/card";

interface FeatureGalleryProps {
  category: string;
}

const FeatureGallery = ({ category }: FeatureGalleryProps) => {
  if (category !== 'Perfumes' && category !== 'Sunglasses') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {category === 'Perfumes' && (
            <>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Premium Fragrances</h2>
                <p className="text-gray-600">
                  Our collection features exclusive scents from the world's most prestigious fragrance houses. 
                  Each bottle is a work of art, containing carefully blended notes that create a unique olfactory experience.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1596742578443-7682ef5251cd?q=80&w=800&auto=format&fit=crop" 
                    alt="Luxury perfume bottle" 
                    className="rounded-lg shadow-sm h-32 object-cover w-full"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop" 
                    alt="Perfume collection" 
                    className="rounded-lg shadow-sm h-32 object-cover w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?q=80&w=800&auto=format&fit=crop" 
                  alt="Luxury perfume display" 
                  className="rounded-xl shadow-md max-h-80 object-cover"
                />
              </div>
            </>
          )}
          
          {category === 'Sunglasses' && (
            <>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Designer Eyewear</h2>
                <p className="text-gray-600">
                  Discover our curated selection of premium sunglasses, combining style with UV protection. 
                  From classic aviators to trendy oversized frames, find the perfect pair to complement your look.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop" 
                    alt="Sunglasses collection" 
                    className="rounded-lg shadow-sm h-32 object-cover w-full"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop" 
                    alt="Designer sunglasses" 
                    className="rounded-lg shadow-sm h-32 object-cover w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" 
                  alt="Luxury sunglasses display" 
                  className="rounded-xl shadow-md max-h-80 object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureGallery;
