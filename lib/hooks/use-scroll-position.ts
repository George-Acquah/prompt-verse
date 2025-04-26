import { useState, useEffect } from "react";

export function useScrollPosition(threshold = 300, shouldListen = true) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!shouldListen) {
      setIsScrolled(false);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldListen, threshold]);

  return { isScrolled };
}
