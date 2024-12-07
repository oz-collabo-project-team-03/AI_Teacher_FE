import studentIcon1 from '@assets/editProfile/student/studentIcon1.png';

type ProfileImageProps = {
  src: string | null;
};

const ProfileImage = ({ src }: ProfileImageProps) => {
  return (
    <img
      src={src || studentIcon1}
      alt='user image'
      className='h-[30px] w-[30px] rounded-full'
      onError={(e) => {
        e.currentTarget.src = studentIcon1;
      }}
    />
  );
};

export default ProfileImage;
