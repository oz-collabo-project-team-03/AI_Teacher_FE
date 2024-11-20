import StudentPage from '../../components/myPage/StudentPage';
// import TeacherPage from '../../components/myPage/TeacherPage';

const MyPage = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center overflow-y-scroll pb-[62px]'>
      {/* 로그인한 유저의 역할에 따라 컴포넌트 변경 */}
      <StudentPage />
      {/* <TeacherPage /> */}
    </div>
  );
};

export default MyPage;
