import { useEffect } from 'react';

const useScrollAnimation = (refList = null) => {
  useEffect(() => {
    const items = Array.isArray(refList?.current)
      ? Array.from(new Set(refList.current))
      : [];

    if (items.length === 0 || typeof window === 'undefined') {
      return;
    }

    items.forEach((div) => div.classList.add('animation'));

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle('active', entry.isIntersecting);
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -25% 0px',
          threshold: 0,
        },
      );

      items.forEach((div) => observer.observe(div));
    } else {
      let ticking = false;
      const handleScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          items.forEach((div) => {
            const rectTop = div.getBoundingClientRect().top + scrollPosition;
            const isActive = scrollPosition >= rectTop - window.innerHeight * 0.75;
            div.classList.toggle('active', isActive);
          });
          ticking = false;
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      observer = {
        disconnect() {
          window.removeEventListener('scroll', handleScroll);
        },
      };
    }

    return () => {
      if (observer && typeof observer.disconnect === 'function') observer.disconnect();
    };
  }, [refList]);
};

export default useScrollAnimation