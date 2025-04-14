import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IndianRupee, DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Create a key for storing currency preference
const CURRENCY_PREFERENCE_KEY = 'grandeurbay-currency-preference';

const CurrencyPreference = () => {
  const [currency, setCurrency] = useState('INR');
  const { toast } = useToast();
  
  // Load saved preference on component mount
  useEffect(() => {
    const savedPreference = localStorage.getItem(CURRENCY_PREFERENCE_KEY);
    if (savedPreference) {
      setCurrency(savedPreference);
    }
  }, []);
  
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    
    // Save preference to localStorage
    localStorage.setItem(CURRENCY_PREFERENCE_KEY, newCurrency);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('currency-changed', { detail: { currency: newCurrency } }));
    
    toast({
      title: `Currency updated to ${newCurrency}`,
      description: `All prices will now be shown in ${newCurrency === 'INR' ? 'Indian Rupees' : 'US Dollars'}`,
    });
    
    // Reload page to update all prices
    window.location.reload();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
          {currency === 'INR' ? <IndianRupee size={18} /> : <DollarSign size={18} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleCurrencyChange('INR')} className={currency === 'INR' ? 'bg-gray-100' : ''}>
          <IndianRupee size={16} className="mr-2" />
          <span>Indian Rupee (₹)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCurrencyChange('USD')} className={currency === 'USD' ? 'bg-gray-100' : ''}>
          <DollarSign size={16} className="mr-2" />
          <span>US Dollar ($)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyPreference;
