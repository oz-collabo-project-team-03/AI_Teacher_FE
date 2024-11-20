import { Link } from 'react-router-dom';
import { editIcon } from '../../assets/assets';
import teacherDefaultIcon from '../../assets/editProfile/teacher/teacherDefaultIcon.png';

const TeacherPage = () => {
  const profileInfo = [
    { label: '닉네임', value: '닉네임' },
    { label: '소속 종류', value: '소속 종류' },
    { label: '소속 이름', value: '소속 이름' },
    { label: '직급', value: '직급' },
  ];

  return (
    <div className='flex w-full flex-col items-center gap-12 px-8 py-12'>
      <div className='relative h-[92px] w-[92px] rounded-full'>
        <img
          src={teacherDefaultIcon}
          alt='선생님 기본 이미지'
          className='h-full w-full'
        />
        <Link to='/edit-profile'>
          <img
            src={editIcon}
            alt='프로필 수정 아이콘'
            className='absolute bottom-0 right-0'
          />
        </Link>
      </div>

      <ul className='flex min-w-[361px] flex-col gap-9'>
        {profileInfo.map((info, index) => (
          <li
            key={index}
            className='flex h-[50px] w-full items-center rounded-[10px] px-5 py-[14px] shadow-profileInfoShadow'
          >
            <p className='w-[95px] text-[16px] font-semibold text-textMainColor'>
              {info.label}
            </p>
            <p className='text-sm font-medium text-captionColor'>
              {info.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherPage;
