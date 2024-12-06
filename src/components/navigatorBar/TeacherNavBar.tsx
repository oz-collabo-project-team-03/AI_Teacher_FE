import BaseNavBar from './BaseNavBar';
import { layoutNavItem } from '@/types/layoutNavType';
import {
  chatActiveIcon,
  homeActiveIcon,
  userActiveIcon,
  chatOutlineIcon,
  homeOutlineIcon,
  userOutlineIcon,
} from '@/assets/assets';
import teacherIcon1 from '@/assets/editProfile/teacher/teacherIcon1.png';

// 네비게이션 설정
const TEACHER_NAV_ITEMS: layoutNavItem[] = [
  {
    id: 'home',
    path: '/teacher-home',
    icons: {
      outline: homeOutlineIcon,
      active: homeActiveIcon,
    },
  },
  {
    id: 'main',
    path: '/teacher-main',
    icons: {
      outline: userOutlineIcon,
      active: userActiveIcon,
    },
  },
  {
    id: 'chat',
    path: '/teacher/chats',
    icons: {
      outline: chatOutlineIcon,
      active: chatActiveIcon,
    },
  },
];

const TeacherNavBar = () => {
  return (
    <BaseNavBar
      items={TEACHER_NAV_ITEMS}
      profilePath='/teacher/my-page'
      profileImg={teacherIcon1}
    />
  );
};

export default TeacherNavBar;
