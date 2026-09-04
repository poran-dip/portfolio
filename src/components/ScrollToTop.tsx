import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 w-12 h-12 rounded-full
        bg-surface-raised/70 hover:bg-surface-raised
        backdrop-blur-md border border-mist/20
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:scale-108 active:scale-92
        flex items-center justify-center cursor-pointer
        ${isVisible ? "translate-y-0 pointer-events-auto" : "translate-y-16 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      <ChevronUp
        size={20}
        className="text-foam hover:text-bioglow transition-colors duration-200"
      />
    </button>
  );
};

export default ScrollToTop;
