import student10 from '../../assets/editProfile/student/studentIcon10.png';

const FeedPostUserInfo = () => {
  return (
    <div className='flex h-[54px] w-full items-center px-[7px] py-[8px]'>
      <img
        src={student10}
        alt='studentProfileImage'
        className='mr-[9px] h-[40px] w-[40px] rounded-full'
      />
      <div className='flex flex-col gap-1'>
        <p className='text-[20px] font-medium leading-none'>oh_sam</p>
        <p className='text-[12px] font-medium leading-none text-hobbyText'>
          축구, 게임
        </p>
      </div>
    </div>
  );
};

export default FeedPostUserInfo;
