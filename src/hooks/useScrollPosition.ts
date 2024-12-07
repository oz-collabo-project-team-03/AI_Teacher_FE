import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 스크롤 위치를 값으로 저장하는 객체
let scrollPositions: Record<string, number> = {};

// 스크롤 위치 초기화 함수
export const clearScrollPositions = () => {
  scrollPositions = {};
};

// 스크롤 가능한 div 요소의 참조를 받기
export const useScrollPosition = (
  scrollContainerRef: React.RefObject<HTMLDivElement>,
  isDataLoaded: boolean // 데이터 로드 상태를 받는 매개변수 추가
) => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || !isDataLoaded) return; // 데이터가 로드되지 않았으면 리턴

    const savedPosition = scrollPositions[path];
    if (savedPosition) {
      scrollContainer.scrollTop = savedPosition;
    }

    const handleScroll = () => {
      scrollPositions[path] = scrollContainer.scrollTop;
    };

    handleScroll();

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [path, scrollContainerRef, isDataLoaded]);
};
