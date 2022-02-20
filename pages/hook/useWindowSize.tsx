import { useState, useEffect } from "react";

export default function useWindowSize() {
  const getSize = () => {
    if (window)
      return { width: window.innerWidth, height: window.innerHeight, };
    else
      return { width: 0, height: 0, };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
