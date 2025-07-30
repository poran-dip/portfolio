import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 w-16 h-16 rounded-full
        bg-zinc-200/80 dark:bg-zinc-800/80
        backdrop-blur-md border border-zinc-300/50 dark:border-zinc-700/50
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        opacity-80 hover:opacity-100
        hover:scale-110 active:scale-95
        flex items-center justify-center
        ${isVisible ? 'translate-y-0 pointer-events-auto' : 'translate-y-16 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <ChevronUp 
        size={20} 
        className="text-zinc-700 dark:text-zinc-300 transition-colors duration-200" 
      />
    </button>
  );
}

export default ScrollToTopButton;
