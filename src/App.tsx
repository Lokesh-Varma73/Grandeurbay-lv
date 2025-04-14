
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import WishlistDrawer from "./components/WishlistDrawer";
import { useEffect } from "react";
import CategoryPage from "./pages/CategoryPage";

// Create a query client
const queryClient = new QueryClient();

// Add Google Font - Poppins
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
document.head.appendChild(fontLink);

// Add India-specific meta tags and SEO improvements
const addMetaTags = () => {
  // Add language meta tag for Hindi and English
  const langMeta = document.createElement("meta");
  langMeta.setAttribute("name", "language");
  langMeta.setAttribute("content", "en-IN, hi-IN");
  document.head.appendChild(langMeta);
  
  // Add region meta tag
  const regionMeta = document.createElement("meta");
  regionMeta.setAttribute("name", "geo.region");
  regionMeta.setAttribute("content", "IN");
  document.head.appendChild(regionMeta);
  
  // Set title to include India
  document.title = "GrandeurBay India - Premium Fashion & Luxury Store";
  
  // Add description meta tag
  const descriptionMeta = document.createElement("meta");
  descriptionMeta.setAttribute("name", "description");
  descriptionMeta.setAttribute("content", "Shop premium quality clothing, accessories, and lifestyle products. Discover the latest trends with free shipping on orders over ₹5,000.");
  document.head.appendChild(descriptionMeta);
  
  // Add keywords meta tag
  const keywordsMeta = document.createElement("meta");
  keywordsMeta.setAttribute("name", "keywords");
  keywordsMeta.setAttribute("content", "luxury fashion, premium clothing, online shopping India, designer wear, high-quality apparel");
  document.head.appendChild(keywordsMeta);
  
  // Add viewport meta tag for better responsiveness
  const viewportMeta = document.createElement("meta");
  viewportMeta.setAttribute("name", "viewport");
  viewportMeta.setAttribute("content", "width=device-width, initial-scale=1.0");
  document.head.appendChild(viewportMeta);
  
  // Add canonical URL
  const canonicalLink = document.createElement("link");
  canonicalLink.setAttribute("rel", "canonical");
  canonicalLink.setAttribute("href", window.location.origin);
  document.head.appendChild(canonicalLink);
};

const App = () => {
  // Apply the custom font to the body when the app loads
  useEffect(() => {
    document.body.classList.add("font-poppins");
    
    // Add a custom class to enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Add meta tags and SEO improvements
    addMetaTags();
    
    return () => {
      document.body.classList.remove("font-poppins");
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/google" element={<SignUp />} /> {/* Route for Google auth in new window */}
                
                {/* Protected Account Routes */}
                <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/account/orders" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/account/wishlist" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/account/payment-methods" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/account/settings" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                
                {/* Category Routes */}
                <Route path="/category/men" element={<CategoryPage category="Men" />} />
                <Route path="/category/women" element={<CategoryPage category="Women" />} />
                <Route path="/category/kids" element={<CategoryPage category="Kids" />} />
                <Route path="/category/shoes" element={<CategoryPage category="Shoes" />} />
                <Route path="/category/clothing" element={<CategoryPage category="Clothing" />} />
                <Route path="/category/perfumes" element={<CategoryPage category="Perfumes" />} />
                <Route path="/category/sunglasses" element={<CategoryPage category="Sunglasses" />} />
                <Route path="/category/shirts" element={<CategoryPage category="Shirts" />} />
                <Route path="/category/pants" element={<CategoryPage category="Pants" />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <WishlistDrawer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
