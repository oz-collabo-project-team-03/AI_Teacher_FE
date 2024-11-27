import { useEffect, useState } from 'react';

import MainHeader from '../../components/main/MainHeader';
import ManagedList from '../../components/main/ManagedList';
import TeacherInfo from '@/components/main/TeacherInfo';

const ManagedStudentListPage = () => {
  const [teacherData, setTeacherData] = useState({
    name: '',
    profileImage: '',
  });

  //임시 데이터 (추후 서버통신으로 교체 예정)
  useEffect(() => {
    const fetchTeacherData = async () => {
      setTeacherData({
        name: '양준영',
        profileImage: '',
      });
    };
    fetchTeacherData();
  }, []);

  return (
    <div className='flex h-svh flex-col'>
      <MainHeader />
      <TeacherInfo
        name={teacherData.name}
        profileImage={teacherData.profileImage}
      />

      <ManagedList />
    </div>
  );
};

export default ManagedStudentListPage;
