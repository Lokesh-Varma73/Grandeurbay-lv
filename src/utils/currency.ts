
// Currency conversion utility
// For a real app, you would use an API, but we'll use a fixed rate for now
const USD_TO_INR_RATE = 83.12; // Example exchange rate (as of March 2024)

export const convertToINR = (usdPrice: number): number => {
  return usdPrice * USD_TO_INR_RATE;
};

export const formatINR = (price: number): string => {
  return `₹${price.toFixed(0)}`;
};

// Function to get currency symbol
export const getCurrencySymbol = (): string => {
  return '₹';
};

// Format currency with proper Indian number formatting (adds commas at appropriate places)
export const formatIndianCurrency = (price: number): string => {
  // Convert to string and split by decimal point
  const [wholePart, decimalPart] = price.toFixed(0).split('.');
  
  // Format whole part with commas in Indian style (e.g., 1,23,456)
  let formattedWholePart = '';
  const digits = wholePart.split('');
  
  // Process the digits from right to left
  for (let i = digits.length - 1, count = 0; i >= 0; i--, count++) {
    // Add comma after first 3 digits from right, then after every 2 digits
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      formattedWholePart = ',' + formattedWholePart;
    }
    formattedWholePart = digits[i] + formattedWholePart;
  }
  
  // Return formatted price with ₹ symbol
  return `₹${formattedWholePart}${decimalPart ? '.' + decimalPart : ''}`;
};

// Convert price from INR to USD
export const convertToUSD = (inrPrice: number): number => {
  return inrPrice / USD_TO_INR_RATE;
};

// Format as USD
export const formatUSD = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Get total price after applying discount
export const getDiscountedPrice = (price: number, discountPercentage: number): number => {
  return price * (1 - discountPercentage / 100);
};

// Calculate discount amount
export const getDiscountAmount = (price: number, discountPercentage: number): number => {
  return price * (discountPercentage / 100);
};

// Find price tier based on price in INR
export const getPriceTier = (priceInINR: number): string => {
  if (priceInINR < 1000) return 'Budget';
  if (priceInINR < 3000) return 'Regular';
  if (priceInINR < 7000) return 'Premium';
  return 'Luxury';
};

// Format price with the Indian currency symbol and comma separation based on current locale
export const formatCurrencyINR = (amount: number): string => {
  // Use the Indian locale 'en-IN' for proper formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);
};
