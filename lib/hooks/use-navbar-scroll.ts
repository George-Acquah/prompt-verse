import { useState, useEffect } from "react";

const useNavbarScroll = () => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 80) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
  return isFixed;
}

export default useNavbarScroll;