
import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Close search on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      // Navigate results with arrow keys
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const items = [...(query ? results : []), ...(query.length < 2 ? recentSearches : [])];
        
        if (items.length === 0) return;
        
        if (e.key === 'ArrowDown') {
          setHighlightedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
        } else {
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
        }
      }

      // Select highlighted item with Enter
      if (e.key === 'Enter') {
        if (highlightedIndex === -1) return;

        if (highlightedIndex < results.length) {
          // Product result
          handleProductClick(results[highlightedIndex].id);
        } else {
          // Recent search
          const searchIndex = highlightedIndex - results.length;
          if (recentSearches[searchIndex]) {
            setQuery(recentSearches[searchIndex]);
            handleSearch({ target: { value: recentSearches[searchIndex] } } as React.ChangeEvent<HTMLInputElement>);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, results, recentSearches, query]);

  // Scroll highlighted result into view
  useEffect(() => {
    if (highlightedIndex !== -1 && resultsRef.current) {
      const highlightedElement = resultsRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
        });
      }
    }
  }, [highlightedIndex]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setHighlightedIndex(-1);
    
    if (searchQuery.length >= 2) {
      const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  const handleProductClick = (productId: number) => {
    // Add to recent searches
    const productName = products.find(p => p.id === productId)?.name || '';
    if (productName) {
      addToRecentSearches(productName);
    }

    setIsOpen(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };
  
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const addToRecentSearches = (search: string) => {
    setRecentSearches(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.toLowerCase() !== search.toLowerCase());
      // Add to beginning of array and limit to 5
      return [search, ...filtered].slice(0, 5);
    });
  };

  const handleSearchSubmit = () => {
    // Only add to recent searches if there's a query
    if (query.trim().length > 0) {
      addToRecentSearches(query);
      
      // If we have results, go to the first one
      if (results.length > 0) {
        handleProductClick(results[0].id);
      } else {
        // Show a toast if no results
        toast({
          title: "No results found",
          description: `No products match "${query}"`,
        });
      }
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    handleSearch({ target: { value: search } } as React.ChangeEvent<HTMLInputElement>);
    // Move this search to the top of recents
    addToRecentSearches(search);
  };

  const removeRecentSearch = (e: React.MouseEvent, search: string) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(item => item !== search));
  };

  const clearAllRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    toast({
      title: "Search history cleared",
      description: "Your recent searches have been cleared",
    });
  };

  return (
    <div ref={searchRef} className="relative">
      {!isOpen ? (
        <button 
          className="p-2 text-gray-600 hover:text-black transition-colors" 
          onClick={() => setIsOpen(true)}
          aria-label="Open search"
        >
          <Search size={20} />
        </button>
      ) : (
        <div className="absolute right-0 top-0 z-50 w-full md:w-[450px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="flex items-center p-3">
            <Search size={18} className="text-gray-400 mr-2 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search products..."
              className="flex-1 outline-none text-sm"
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && highlightedIndex === -1) {
                  handleSearchSubmit();
                }
              }}
            />
            {query && (
              <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={18} />
              </button>
            )}
          </div>
          
          <div 
            ref={resultsRef}
            className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100"
          >
            {/* Product results */}
            {results.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Products
                </div>
                {results.map((product, index) => (
                  <div 
                    key={product.id}
                    className={cn(
                      "px-4 py-2 hover:bg-gray-50 cursor-pointer",
                      highlightedIndex === index ? "bg-gray-50" : ""
                    )}
                    onClick={() => handleProductClick(product.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.category}</p>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <p className="text-sm font-medium">${product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Recent searches */}
            {recentSearches.length > 0 && query.length < 2 && (
              <div className="py-2">
                <div className="px-4 py-1 flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Recent Searches
                  </span>
                  <button 
                    onClick={clearAllRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <div 
                    key={search}
                    className={cn(
                      "px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center",
                      highlightedIndex === (results.length + index) ? "bg-gray-50" : ""
                    )}
                    onClick={() => handleRecentSearchClick(search)}
                    onMouseEnter={() => setHighlightedIndex(results.length + index)}
                  >
                    <Clock size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 flex-1 truncate">{search}</span>
                    <button 
                      onClick={(e) => removeRecentSearch(e, search)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      aria-label={`Remove ${search} from recent searches`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* No results */}
            {query.length >= 2 && results.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-2">No products found for "{query}"</p>
                <p className="text-sm text-gray-400">Try checking your spelling or use more general terms</p>
              </div>
            )}
            
            {/* Empty state */}
            {query.length < 2 && recentSearches.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-2">Start typing to search</p>
                <p className="text-sm text-gray-400">Search for products by name or category</p>
              </div>
            )}
          </div>
          
          {/* Search footer */}
          {(results.length > 0 || query.length >= 2) && (
            <div className="p-3 bg-gray-50 flex justify-between items-center border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {results.length} results
              </span>
              <button 
                className="flex items-center text-sm font-medium text-black hover:underline"
                onClick={handleSearchSubmit}
              >
                View All Results
                <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
