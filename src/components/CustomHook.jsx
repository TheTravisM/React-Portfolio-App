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

    // Use IntersectionObserver to detect when items enter the viewport.
    // This avoids layout thrashing caused by repeatedly calling
    // getBoundingClientRect inside a scroll handler.
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Toggle the `active` class when the element intersects the viewport
            entry.target.classList.toggle('active', entry.isIntersecting);
          });
        },
        {
          root: null,
          // Trigger when element is within ~75% of the viewport height
          rootMargin: '0px 0px -25% 0px',
          threshold: 0,
        }
      );

      items.forEach((div) => observer.observe(div));
    } else {
      // Fallback: batch reads/writes and use requestAnimationFrame to avoid forced reflow
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

      // cleanup will remove the listener below
      observer = {
        disconnect() {
          window.removeEventListener('scroll', handleScroll);
        },
      };
    }

    return () => {
      if (observer && typeof observer.disconnect === 'function') observer.disconnect();
    };
  }, [activeTab, refList]);
};

export default useScrollAnimation