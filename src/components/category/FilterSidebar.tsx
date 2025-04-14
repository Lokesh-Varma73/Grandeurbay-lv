
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FilterSidebarProps {
  showFilters: boolean;
  priceRange: string;
  setPriceRange: (range: string) => void;
  priceRanges: string[];
  availableSizes: string[];
  selectedSizes: string[];
  toggleSizeFilter: (size: string) => void;
  availableColors: string[];
  selectedColors: string[];
  toggleColorFilter: (color: string) => void;
  resetFilters: () => void;
}

const FilterSidebar = ({
  showFilters,
  priceRange,
  setPriceRange,
  priceRanges,
  availableSizes,
  selectedSizes,
  toggleSizeFilter,
  availableColors,
  selectedColors,
  toggleColorFilter,
  resetFilters
}: FilterSidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside className={`md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
        
        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange === range}
                  onChange={() => setPriceRange(range)}
                  className="mr-2"
                />
                <span className="text-sm">{range}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Size Filter */}
        {availableSizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 text-xs border rounded-md transition ${
                    selectedSizes.includes(size)
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  onClick={() => toggleSizeFilter(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Color Filter */}
        {availableColors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-1 text-xs border rounded-md transition ${
                    selectedColors.includes(color)
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  onClick={() => toggleColorFilter(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
