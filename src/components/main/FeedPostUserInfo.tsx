import student10 from '../../assets/profileEdit/student/stIcon10.svg';

const FeedPostUserInfo = () => {
  return (
    <div className='flex h-[54px] w-full items-center px-[7px] py-[8px]'>
      <img src={student10} alt='프로필이미지' className='h-[40px] w-[40px]' />
      <div>
        <div>oh_sam</div>
        <div>축구, 게임</div>
      </div>
    </div>
  );
};

export default FeedPostUserInfo;
