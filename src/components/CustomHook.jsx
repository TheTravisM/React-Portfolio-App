import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useScrollAnimation = (refList = null) => {
  const activeTab = useSelector((state) => state.activeTab);

  useEffect(() => {
    const items = Array.isArray(refList?.current)
      ? Array.from(new Set(refList.current))
      : [];

    if (typeof document !== 'undefined' && activeTab) {
      const activeElement = document.getElementById(activeTab);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (items.length === 0 || typeof window === 'undefined') {
      return;
    }

    items.forEach((div) => div.classList.add('animation'));

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      items.forEach((div) => {
        const offsetTop = div.getBoundingClientRect().top + scrollPosition;
        const isActive = scrollPosition >= offsetTop - window.innerHeight * 0.75;
        div.classList.toggle('active', isActive);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, refList]);
};

export default useScrollAnimation