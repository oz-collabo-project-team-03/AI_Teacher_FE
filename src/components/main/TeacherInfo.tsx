import teacherIcon1 from '../../assets/editProfile/teacher/teacherIcon1.png';

type TeacherInfoProps = {
  name: string;
  profileImage: string;
};

const TeacherInfo = ({ name, profileImage }: TeacherInfoProps) => {
  return (
    <div className='mt-[72px] h-[112px] gap-4 border-b border-inputBorderColor'>
      <div className='m-[16px] flex items-center gap-4'>
        <img
          src={profileImage || teacherIcon1}
          alt='teacher Default Icon'
          className='around-full h-[60px] w-[60px]'
          onError={(e) => {
            e.currentTarget.src = teacherIcon1;
          }}
        />
        <p className='text-[18px] font-semibold text-mainLogoTextColor'>
          {name || '수행쌤 닉네임'}
        </p>
      </div>
    </div>
  );
};

export default TeacherInfo;
