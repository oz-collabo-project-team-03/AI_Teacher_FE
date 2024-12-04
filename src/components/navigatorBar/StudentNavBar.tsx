import BaseNavBar from './BaseNavBar';
import { layoutNavItem } from '@/types/layoutNavType';
import {
  chatActiveIcon,
  homeActiveIcon,
  plusActiveIcon,
  chatOutlineIcon,
  homeOutlineIcon,
  plusOutlineIcon,
} from '@/assets/assets';
import studentDefaultIcon from '@/assets/editProfile/student/studentDefaultIcon.png';

// 네비게이션 설정
const STUDENT_NAV_ITEMS: layoutNavItem[] = [
  {
    id: 'main',
    path: '/student-main',
    icons: {
      outline: homeOutlineIcon,
      active: homeActiveIcon,
    },
  },
  {
    id: 'post',
    path: '/student/post',
    icons: {
      outline: plusOutlineIcon,
      active: plusActiveIcon,
    },
  },
  {
    id: 'chats',
    path: '/student/chats',
    icons: {
      outline: chatOutlineIcon,
      active: chatActiveIcon,
    },
  },
];

const StudentNavBar = () => {
  return (
    <BaseNavBar
      items={STUDENT_NAV_ITEMS}
      profilePath='/my-page'
      profileImg={studentDefaultIcon}
    />
  );
};

export default StudentNavBar;
