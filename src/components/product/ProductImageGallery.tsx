
import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    if (isFullscreen && !isZoomed) {
      // If in fullscreen mode and zooming out, exit fullscreen as well
      setIsFullscreen(false);
    }
  };
  
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      // When entering fullscreen, reset zoom
      setIsZoomed(false);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isFullscreen) {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    }
  };
  
  return (
    <div className="space-y-4" ref={galleryRef} onKeyDown={handleKeyDown} tabIndex={0}>
      <div 
        className={`relative ${
          isFullscreen 
            ? 'fixed inset-0 z-50 bg-black flex items-center justify-center p-4' 
            : 'aspect-square bg-gray-100 rounded-lg overflow-hidden'
        } ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
      >
        <div 
          className={`${isFullscreen ? 'max-h-[90vh] max-w-full' : 'w-full h-full'} transition-all duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed 
              ? { 
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` 
                } 
              : undefined
          }
        >
          <img 
            src={images[currentImage]} 
            alt={productName}
            className={`${isFullscreen ? 'max-h-[90vh] max-w-full object-contain' : 'w-full h-full object-cover'}`}
          />
        </div>
        
        {/* Control buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleZoomToggle();
            }}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          
          <button
            className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenToggle();
            }}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white transition-all"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Previous image"
            >
              <ArrowLeft size={18} />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-white transition-all"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Next image"
            >
              <ArrowRight size={18} />
            </button>
          </>
        )}
        
        {isZoomed && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            Move mouse to explore or click to exit zoom
          </div>
        )}
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {currentImage + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail grid */}
      {!isFullscreen && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
                currentImage === index ? 'border-black' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img 
                src={image} 
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
