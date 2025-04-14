
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryCarousel from '@/components/CategoryCarousel';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MobileNavigation from '@/components/MobileNavigation';
import { ArrowRight, ShieldCheck, Truck, Repeat, CreditCard, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <Hero />
      
      <div className="container mx-auto px-4 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Discover Excellence</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">Premium Collection</h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-px w-24 bg-gray-900 dark:bg-gray-100"></div>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-700"></div>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">Experience the finest selection of premium fashion, crafted with impeccable attention to detail and quality materials</p>
        </div>
      </div>
      
      <FeaturedProducts />
      
      <CategoryCarousel />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900"></div>
          <div className="absolute inset-0 opacity-40" 
               style={{ 
                 backgroundImage: "url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2073&auto=format&fit=crop')", 
                 backgroundSize: "cover", 
                 backgroundPosition: "center"
               }}>
          </div>
          <div className="relative p-8 md:p-12 lg:p-20 text-white">
            <div className="max-w-lg">
              <span className="inline-block mb-3 text-sm font-medium text-white/80 tracking-wider px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                New Arrival
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight leading-tight">Autumn Collection 2024</h2>
              <p className="mb-8 text-white/80 text-lg">Elevate your wardrobe with our latest collection featuring premium fabrics and timeless designs.</p>
              <Link to="/products?category=Autumn">
                <button className="px-6 md:px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-white/90 transition-all transform hover:scale-105 hover:shadow-lg flex items-center gap-2 group">
                  Explore Collection
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl mb-16 md:mb-20">
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Why Choose GrandeurBay</h2>
          <p className="text-muted-foreground">Experience shopping with confidence through our premium services</p>
        </div>
        
        {isMobile ? (
          <div className="space-y-4">
            <Collapsible className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <CollapsibleTrigger className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                    <Truck size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Premium Delivery</h3>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 pl-13 ml-13">
                <p className="text-gray-600 dark:text-gray-300 ml-13">Free premium delivery on all orders above ₹5,000</p>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <CollapsibleTrigger className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                    <Repeat size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Easy Returns</h3>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <p className="text-gray-600 dark:text-gray-300 ml-13">30-day hassle-free return policy on all products</p>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <CollapsibleTrigger className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Secure Shopping</h3>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <p className="text-gray-600 dark:text-gray-300 ml-13">100% authentic products with quality assurance</p>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <CollapsibleTrigger className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                    <CreditCard size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Secure Payments</h3>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <p className="text-gray-600 dark:text-gray-300 ml-13">Multiple secure payment options available</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transform transition-all hover:-translate-y-2 hover:shadow-md">
              <div className="w-14 h-14 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Free premium delivery on all orders above ₹5,000</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transform transition-all hover:-translate-y-2 hover:shadow-md">
              <div className="w-14 h-14 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                <Repeat size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-300">30-day hassle-free return policy on all products</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transform transition-all hover:-translate-y-2 hover:shadow-md">
              <div className="w-14 h-14 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
              <p className="text-gray-600 dark:text-gray-300">100% authentic products with quality assurance</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transform transition-all hover:-translate-y-2 hover:shadow-md">
              <div className="w-14 h-14 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">Multiple secure payment options available</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl mb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">Stay updated with our latest collections and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
      <CartDrawer />
      <MobileNavigation />
    </div>
  );
};

export default Index;
