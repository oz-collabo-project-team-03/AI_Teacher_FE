import { UserInfoProvider } from '@/context/UserInfoContextProvider';
import { useAuth } from '@/hooks/useAuth';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  const { userId } = useAuth();

  return (
    <div className='flex items-center justify-center bg-gray-50 font-pre'>
      <div className='h-svh w-full bg-white md:w-[425px] lg:w-[425px]'>
        {userId ? (
          <UserInfoProvider userId={userId}>
            <Outlet />
          </UserInfoProvider>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
export default DefaultLayout;
