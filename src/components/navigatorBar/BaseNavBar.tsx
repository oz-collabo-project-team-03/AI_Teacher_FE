import { Link } from 'react-router-dom';
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

  const defaultImg =
    profileData?.role === 'student' ? studentIcon1 : teacherIcon1;

  return (
    <nav className='flex items-center justify-between px-[42px] py-4 shadow-navShadow'>
      {items.map((item) => (
        <Link to={item.path} key={item.id}>
          <img
            src={getIcon(item)}
            alt={`${item.id} icon`}
            className='cursor-pointer transition-all'
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        </Link>
      ))}
      <Link to={profilePath}>
        <img
          src={profileData?.profile_image || defaultImg}
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
          alt='프로필 이미지'
          className='rounded-ful h-8 w-8'
        />
      </Link>
    </nav>
  );
};

export default BaseNavBar;
