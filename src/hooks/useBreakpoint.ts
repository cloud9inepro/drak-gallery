
import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [state, setState] = useState(() => {
    const w = window.innerWidth;
    return { isMobile: w < 768, isTablet: w >= 768 && w < 1200 };
  });

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setState({ isMobile: w < 768, isTablet: w >= 768 && w < 1200 });
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return state;
}