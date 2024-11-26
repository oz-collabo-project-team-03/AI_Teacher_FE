import { Link } from 'react-router-dom';
import { useLayoutNavIcon } from '@/hooks/useLayoutNavIcon';
import { layoutNavItem } from '@/types/layoutNav';

type BaseNavBarProps = {
  items: layoutNavItem[];
  profilePath: string;
  profileImg: string;
};

const BaseNavBar = ({ items, profilePath, profileImg }: BaseNavBarProps) => {
  const { getIcon, setHoveredId } = useLayoutNavIcon();

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
          src={profileImg}
          alt='프로필 이미지'
          className='rounded-ful h-8 w-8'
        />
      </Link>
    </nav>
  );
};

export default BaseNavBar;
