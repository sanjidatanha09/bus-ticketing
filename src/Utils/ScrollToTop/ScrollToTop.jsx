import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableElement = document.querySelector('#scrollable-container') || window;
    scrollableElement.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;