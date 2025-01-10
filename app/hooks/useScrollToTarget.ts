import { useRef } from 'react';

const useScrollToTarget = () => {
  // Use `HTMLDivElement` type since the target is a div element.
  const targetRef = useRef<HTMLDivElement | null>(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { targetRef, scrollToTarget };
};

export default useScrollToTarget;
