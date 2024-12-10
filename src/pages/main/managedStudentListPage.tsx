import LoadingPage from '../status/loadingPage';
import MainHeader from '../../components/main/MainHeader';
import ManagedList from '../../components/main/ManagedList';
import TeacherInfo from '@/components/main/TeacherInfo';
import { useFetchStudentsListQuery } from '../../api/studentsList/studentsList.hook';
import { useQueryClient } from '@tanstack/react-query';

const ManagedStudentListPage = () => {
  const { data, isLoading, error } = useFetchStudentsListQuery();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['profile'] });

  if (isLoading) return <LoadingPage />;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data || !data.students) return <div>No data available</div>;

  const students = Array.isArray(data.students)
    ? data.students.map((student) => ({
        id: student.room_id ?? 0,
        name: student.student_nickname,
        profileImage: student.student_image_url,
        help: student.help_checked,
      }))
    : [];

  return (
    <div className='flex h-full flex-col'>
      <MainHeader />
      <TeacherInfo
        name={data.teacher.teacher_nickname}
        profileImage={data.teacher.teacher_image_url}
      />

      <ManagedList students={students} />
    </div>
  );
};

export default ManagedStudentListPage;
