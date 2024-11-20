import { editIcon } from '../../assets/assets';
import studentDefaultIcon from '../../assets/editProfile/student/studentDefaultIcon.png';
import postTestImg from '../../../src/assets/editProfile/postTestImg.png';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  const profileInfo = {
    nickName: '닉네임',
    dream: '희망진로, 흥미',
    text: '상태 메세지',
    post: 2,
    like: 10,
    comment: 18,
  };

  const communityInfo = [
    { label: '게시물', value: profileInfo.post },
    { label: '좋아요', value: profileInfo.like },
    { label: '작성 댓글', value: profileInfo.comment },
  ];

  const postImg = [
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
    postTestImg,
  ];

  return (
    <div className='flex w-full flex-col items-center gap-9 px-8 py-12'>
      <ul className='flex flex-col gap-2'>
        <li className='relative h-[92px] w-[92px] rounded-full'>
          <img
            src={studentDefaultIcon}
            alt='학생 기본 이미지'
            className='h-full w-full'
          />
          <Link to='/edit-profile'>
            <img
              src={editIcon}
              alt='프로필 수정 아이콘'
              className='absolute bottom-0 right-0'
            />
          </Link>
        </li>

        <li className='flex flex-col items-center'>
          <p className='text-xl font-bold text-textMainColor'>
            {profileInfo.nickName}
          </p>
          <p className='mb-2 text-captionColor'>{profileInfo.dream}</p>
          <p className='text-[13px] font-medium text-textMainColor'>
            {profileInfo.text}
          </p>
        </li>
      </ul>

      <ul className='flex items-center justify-center gap-5'>
        {communityInfo.map((info, index) => (
          <li
            key={index}
            className='flex h-[50px] w-[83px] flex-col items-center justify-center rounded-[10px] shadow-profileInfoShadow'
          >
            <p className='text-[13px] font-normal text-textMainColor'>
              {info.label}
            </p>
            <p className='text-[15px] font-bold text-profilePointTextColor'>
              {info.value}
            </p>
          </li>
        ))}
      </ul>

      <div className='flex w-[321px] flex-col gap-3'>
        <p className='text-left text-xs font-medium text-captionColor'>
          내 게시글
        </p>
        <div className='flex flex-wrap gap-[15px]'>
          {postImg.map((img, index) => (
            <div
              key={`img${index}`}
              className='h-[97px] w-[97px] overflow-hidden border border-postBorderColor'
            >
              <img
                src={img}
                alt='게시글 이미지'
                className='h-full w-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
