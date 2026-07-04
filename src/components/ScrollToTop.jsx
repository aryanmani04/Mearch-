import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`pointer-events-auto py-2 px-2 rounded-full cursor-pointer
                    bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white
                    shadow-2xl hover:bg-zinc-800 hover:border-white/20
                    transition-all duration-300
                    ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default ScrollToTop;