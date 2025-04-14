
import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const slides = [
  {
    id: 1,
    title: "WORKSPACE ELEGANCE",
    subtitle: "Premium Workspace Collection 2024",
    description: "Elevate your work environment with our curated selection of high-performance and stylish workspace essentials",
    buttonText: "Explore Workspace",
    backgroundImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop", // Updated image URL
    position: "center",
    link: "/products"
  },
  {
    id: 2,
    title: "SUMMER ESSENTIALS",
    subtitle: "Season's Must-Haves",
    description: "Elevated basics crafted from premium materials for enduring style and comfort",
    buttonText: "Explore Collection",
    backgroundImage: "https://images.unsplash.com/photo-1469510360132-9fa6abcd9df0?q=80&w=2070&auto=format&fit=crop",
    position: "center",
    link: "/products?category=Summer"
  },
  {
    id: 3,
    title: "ARTISAN CRAFTED",
    subtitle: "Limited Edition Perfumes",
    description: "Exclusive fragrances meticulously crafted with the finest ingredients for a unique signature scent",
    buttonText: "View Collection",
    backgroundImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2104&auto=format&fit=crop",
    position: "center",
    link: "/category/perfumes"
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('right');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isMobile = useIsMobile();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // Swipe left
      nextSlide();
    }

    if (touchEnd - touchStart > 150) {
      // Swipe right
      prevSlide();
    }
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-700",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image with Parallax & Ken Burns Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out"
            style={{ 
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundPosition: slide.position,
              transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
            }}
            aria-hidden="true"
          />
          
          {/* Enhanced Overlay with Dynamic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" aria-hidden="true" />

          {/* Content with improved animation and layout */}
          <div className="relative z-10 flex h-full container mx-auto px-6 md:px-10">
            <div className="flex flex-col justify-center max-w-xl">
              <div 
                className={cn(
                  "transition-all duration-700 transform",
                  currentSlide === index && !isTransitioning 
                    ? "opacity-100 translate-y-0" 
                    : direction === 'right' 
                      ? "opacity-0 translate-y-10" 
                      : "opacity-0 -translate-y-10"
                )}
              >
                <span className="inline-block mb-3 text-sm md:text-base font-medium text-white/90 tracking-wider px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  {slide.subtitle}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight leading-tight">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-base md:text-lg mb-6 max-w-md">
                  {slide.description}
                </p>
                <Link to={slide.link}>
                  <Button 
                    size="lg"
                    variant="default"
                    className="bg-white text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-full px-6 py-5 md:px-8 md:py-6 font-medium text-sm md:text-base"
                  >
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Enhanced Navigation Buttons - Hidden on Mobile, Visible on Desktop */}
      {!isMobile && (
        <div className="absolute bottom-10 right-10 z-20 hidden md:flex space-x-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30 transition-all transform hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30 transition-all transform hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Slide Indicators - Smaller on Mobile */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 md:left-10 z-20 flex justify-center md:justify-start space-x-3">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 'right' : 'left');
              setCurrentSlide(index);
            }}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              currentSlide === index 
                ? "bg-white w-12 md:w-16" 
                : "bg-white/30 w-6 md:w-8 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
