import BaseNavBar from './BaseNavBar';
import { layoutNavItem } from '@/types/layoutNavType';
import {
  chatActiveIcon,
  chatOutlineIcon,
  homeActiveIcon,
  homeOutlineIcon,
  userActiveIcon,
  userOutlineIcon,
} from '@/assets/assets';

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
    path: '/teacher/managedList',
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
    <BaseNavBar items={TEACHER_NAV_ITEMS} profilePath='/teacher/my-page' />
  );
};

export default TeacherNavBar;
