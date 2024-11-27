import teacherDefaultIcon from '../../assets/editProfile/teacher/teacherDefaultIcon.png';

type TeacherInfoProps = {
  name: string;
  profileImage: string;
};

const TeacherInfo = ({ name, profileImage }: TeacherInfoProps) => {
  return (
    <div className='mt-[72px] h-[112px] gap-4 border-b border-inputBorderColor'>
      <div className='m-[16px] flex items-center gap-4'>
        <img
          src={profileImage || teacherDefaultIcon}
          alt='teacher Default Icon'
          className='h-[60px] w-[60px]'
        />
        <p className='text-[18px] font-semibold text-mainLogoTextColor'>
          {name || '수행쌤 닉네임'}
        </p>
      </div>
    </div>
  );
};

export default TeacherInfo;
