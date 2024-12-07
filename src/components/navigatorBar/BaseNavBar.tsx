import { Link, useLocation } from 'react-router-dom';
import { useLayoutNavIcon } from '@/hooks/useLayoutNavIcon';
import { layoutNavItem } from '@/types/layoutNavType';
import { useProfile } from '@/hooks/useProfile';

type BaseNavBarProps = {
  items: layoutNavItem[];
  profilePath: string;
};

const BaseNavBar = ({ items, profilePath }: BaseNavBarProps) => {
  const { getIcon, setHoveredId } = useLayoutNavIcon();
  const { profileData } = useProfile();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    if (location.pathname === path) {
      const contentArea = document.querySelector('.custom-scrollbar');
      if (contentArea) {
        contentArea.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className='flex items-center justify-between px-[42px] py-4 shadow-navShadow'>
      {items.map((item) => (
        <Link
          to={item.path}
          key={item.id}
          onClick={() => handleNavClick(item.path)}
        >
          <img
            src={getIcon(item)}
            alt={`${item.id} icon`}
            className='cursor-pointer transition-all'
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        </Link>
      ))}
      <Link to={profilePath} onClick={() => handleNavClick(profilePath)}>
        {profileData?.profile_image ? (
          <img
            src={profileData.profile_image}
            alt='프로필 이미지'
            className='rounded-ful h-8 w-8'
          />
        ) : (
          <div className='rounded-ful h-8 w-8 bg-white'></div>
        )}
      </Link>
    </nav>
  );
};

export default BaseNavBar;
