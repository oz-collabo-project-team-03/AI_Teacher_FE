import student10 from '../../assets/profileEdit/student/stIcon10.svg';

const FeedPostUserInfo = () => {
  return (
    <div className='justify-content flex h-[54px] w-full items-center px-[7px] py-[8px]'>
      <img
        src={student10}
        alt='studentProfileImage'
        className='mr-[9px] h-[40px] w-[40px]'
      />
      <div className='justify-content flex flex-col'>
        <div className='text-[20px] font-medium'>oh_sam</div>
        <div className='text-[12px] font-medium text-hobbyText'>축구, 게임</div>
      </div>
    </div>
  );
};

export default FeedPostUserInfo;
