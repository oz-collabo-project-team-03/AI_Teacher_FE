import { Outlet } from 'react-router';

const DefaultLayout = () => {
  return (
    <div className='flex items-center justify-center bg-gray-50 font-pre'>
      <div className='h-svh w-full bg-white md:w-[425px] lg:w-[425px]'>
        <Outlet />
      </div>
    </div>
  );
};
export default DefaultLayout;
