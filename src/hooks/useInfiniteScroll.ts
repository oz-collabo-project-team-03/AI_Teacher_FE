import { useEffect, useRef, useCallback } from 'react';

type UseInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
};

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0.5 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return observerRef;
};
