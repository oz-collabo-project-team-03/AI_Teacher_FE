import { Outlet } from 'react-router';
import StudentNavBar from '../components/navigatorBar/StudentNavBar';

const StudentLayout = () => {
  return (
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
  );
};

export default StudentLayout;
