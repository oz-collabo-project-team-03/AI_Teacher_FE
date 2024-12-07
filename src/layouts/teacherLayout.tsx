import { Navigate, Outlet } from 'react-router';
import TeacherNavBar from '../components/navigatorBar/TeacherNavBar';
import { UserInfoProvider } from '@/context/UserInfoContextProvider';
import { useAuth } from '@/hooks/useAuth';

const TeacherLayout = () => {
  const { userId } = useAuth();
  // 초기화 후 userId 확인
  if (!userId) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 font-pre'>
      <div className='relative flex h-screen w-full flex-col bg-white md:w-[425px] lg:w-[425px]'>
        <div className='flex-grow overflow-auto pb-[64px]'>
          <UserInfoProvider userId={userId}>
            <Outlet />
          </UserInfoProvider>
        </div>
        <div className='fixed bottom-0 left-1/2 w-full -translate-x-1/2 transform bg-white md:w-[425px] lg:w-[425px]'>
          <UserInfoProvider userId={userId}>
            <TeacherNavBar />
          </UserInfoProvider>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
