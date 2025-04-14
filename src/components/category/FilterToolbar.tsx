
import { Button } from '@/components/ui/button';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterToolbarProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filteredProductsCount: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const FilterToolbar = ({
  showFilters,
  setShowFilters,
  filteredProductsCount,
  sortBy,
  setSortBy
}: FilterToolbarProps) => {
  return (
    <div className="sticky top-20 z-20 bg-white shadow-md py-3 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden mr-2 gap-2"
            >
              {showFilters ? <X size={18} /> : <SlidersHorizontal size={18} />}
              {showFilters ? "Hide" : "Filters"}
            </Button>
            
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredProductsCount}</span> products
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-700">Sort by:</label>
            <select 
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="newest">Newest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
