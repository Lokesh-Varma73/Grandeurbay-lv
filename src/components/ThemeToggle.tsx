
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// This is a mock implementation
// In a real implementation, you would use a proper theming system like next-themes
export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useIsMobile();

  // Check user's preferred color scheme on load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    // Apply the theme to the document
    // This is a simple implementation
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  if (isMobile) {
    // Icon only for mobile
    return (
      <button
        onClick={toggleTheme}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  // Icon and label for desktop
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-full transition-all",
        isDarkMode 
          ? "bg-gray-800 text-gray-100 hover:bg-gray-700" 
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <>
          <Sun size={16} />
          <span className="text-sm font-medium">Light</span>
        </>
      ) : (
        <>
          <Moon size={16} />
          <span className="text-sm font-medium">Dark</span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
