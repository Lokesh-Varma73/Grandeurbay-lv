
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/category/shoes" className="text-gray-400 hover:text-white transition-colors">Shoes</Link></li>
              <li><Link to="/category/clothing" className="text-gray-400 hover:text-white transition-colors">Clothing</Link></li>
              <li><Link to="/category/perfumes" className="text-gray-400 hover:text-white transition-colors">Perfumes</Link></li>
              <li><Link to="/category/sunglasses" className="text-gray-400 hover:text-white transition-colors">Sunglasses</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/sale" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li><Link to="/collections/luxury" className="text-gray-400 hover:text-white transition-colors">Luxury</Link></li>
              <li><Link to="/collections/premium" className="text-gray-400 hover:text-white transition-colors">Premium</Link></li>
              <li><Link to="/collections/essentials" className="text-gray-400 hover:text-white transition-colors">Essentials</Link></li>
              <li><Link to="/collections/heritage" className="text-gray-400 hover:text-white transition-colors">Heritage</Link></li>
              <li><Link to="/collections/seasonal" className="text-gray-400 hover:text-white transition-colors">Seasonal</Link></li>
              <li><Link to="/collections/signature" className="text-gray-400 hover:text-white transition-colors">Signature</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help</Link></li>
              <li><Link to="/customer-service" className="text-gray-400 hover:text-white transition-colors">Customer Service</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/size-guide" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/store-finder" className="text-gray-400 hover:text-white transition-colors">Store Finder</Link></li>
              <li><Link to="/order-tracker" className="text-gray-400 hover:text-white transition-colors">Order Tracker</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Company Info</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/affiliates" className="text-gray-400 hover:text-white transition-colors">Affiliates</Link></li>
              <li><Link to="/investors" className="text-gray-400 hover:text-white transition-colors">Investors</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Middle Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 py-8 mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="font-display font-bold text-2xl tracking-tight">GRANDEURBAY</h2>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={20} />
            </a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ChevronUp size={16} />
          </button>
        </div>
        
        {/* Bottom Section */}
        <div className="text-gray-500 text-sm text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-center md:justify-between mb-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
              <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
              <Link to="/cookie-settings" className="hover:text-gray-300 transition-colors">Cookie Settings</Link>
              <Link to="/imprint" className="hover:text-gray-300 transition-colors">Imprint</Link>
            </div>
            
            <div>
              <button 
                onClick={scrollToTop}
                className="flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors md:hidden"
              >
                <span>Back to top</span>
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
          
          <p>© {new Date().getFullYear()} GrandeurBay Inc. All Rights Reserved. This is a demo site for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
