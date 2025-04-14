import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize the state on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isAtTop };
}
