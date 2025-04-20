import { useState, useEffect } from "react";

const useNavbarScroll = (shouldListen = true) => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (!shouldListen) {
      setIsFixed(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldListen]);

  return isFixed;
};

export default useNavbarScroll;
