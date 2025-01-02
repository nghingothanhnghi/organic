// app/hooks/useResponsive
import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useResponsive = (): ResponsiveState => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(true); // Default to true for desktop

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 991); // Consider screen <= 991px as mobile
      setIsTablet(width >= 640 && width <= 1023); // Consider screen between 992px to 1199px as tablet
      setIsDesktop(width >= 1024); // Consider screen >= 1200px as desktop
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
