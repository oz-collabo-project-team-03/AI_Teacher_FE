import { Link, useLocation } from 'react-router-dom';
import { useLayoutNavIcon } from '@/hooks/useLayoutNavIcon';
import { layoutNavItem } from '@/types/layoutNavType';
import { useProfile } from '@/hooks/useProfile';
import studentIcon1 from '@/assets/editProfile/student/studentIcon1.png';
import teacherIcon1 from '@/assets/editProfile/teacher/teacherIcon1.png';

type BaseNavBarProps = {
  items: layoutNavItem[];
  profilePath: string;
};

const BaseNavBar = ({ items, profilePath }: BaseNavBarProps) => {
  const { getIcon, setHoveredId } = useLayoutNavIcon();
  const { profileData } = useProfile();
  const location = useLocation();

  const defaultImage =
    profileData?.role === 'student' ? studentIcon1 : teacherIcon1;

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
        <img
          src={profileData?.profile_image || defaultImage}
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
          alt='프로필 이미지'
          className='rounded-ful h-8 w-8'
        />
      </Link>
    </nav>
  );
};

export default BaseNavBar;
