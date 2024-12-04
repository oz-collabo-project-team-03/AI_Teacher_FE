import { layoutNavItem } from '@/types/layoutNavType';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useLayoutNavIcon = () => {
  const { pathname } = useLocation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIcon = (item: layoutNavItem) => {
    const shouldShowActive = pathname === item.path || hoveredId === item.id;
    return shouldShowActive ? item.icons.active : item.icons.outline;
  };

  return {
    hoveredId,
    setHoveredId,
    getIcon,
  };
};
