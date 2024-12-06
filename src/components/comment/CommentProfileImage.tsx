import studentDefaultIcon from '@assets/editProfile/student/studentIcon1.png';

type ProfileImageProps = {
  src: string | null;
};

const ProfileImage = ({ src }: ProfileImageProps) => {
  return (
    <img
      src={src || studentDefaultIcon}
      alt='user image'
      className='h-[30px] w-[30px] rounded-full'
      onError={(e) => {
        (e.target as HTMLImageElement).src = studentDefaultIcon;
      }}
    />
  );
};

export default ProfileImage;
