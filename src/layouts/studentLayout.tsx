import { Navigate, Outlet } from 'react-router';
import StudentNavBar from '../components/navigatorBar/StudentNavBar';
import { UserInfoProvider } from '@/context/UserInfoContextProvider';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/status/loadingPage';

const StudentLayout = () => {
  const { userId, isInitialized } = useAuth();

  // 초기화되지 않았다면 로딩 상태 표시
  if (!isInitialized) {
    return <LoadingPage />; // 또는 로딩 스피너
  }

  // 초기화 후 userId 확인
  if (!userId) {
    return <Navigate to='/' />;
  }

  return (
    <UserInfoProvider userId={userId}>
      <div className='flex min-h-screen items-center justify-center bg-gray-50 font-pre'>
        <div className='relative flex h-screen w-full flex-col bg-white md:w-[425px] lg:w-[425px]'>
          <div className='flex-grow overflow-auto pb-[64px]'>
            <Outlet />
          </div>
          <div className='fixed bottom-0 left-1/2 w-full -translate-x-1/2 transform bg-white md:w-[425px] lg:w-[425px]'>
            <StudentNavBar />
          </div>
        </div>
      </div>
    </UserInfoProvider>
  );
};

export default StudentLayout;
