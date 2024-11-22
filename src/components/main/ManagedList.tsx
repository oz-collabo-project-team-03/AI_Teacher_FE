import student1 from '../../assets/editProfile/student/studentIcon2.png';
import student10 from '../../assets/editProfile/student/studentIcon11.png';
import student11 from '../../assets/editProfile/student/studentIcon12.png';
import student2 from '../../assets/editProfile/student/studentIcon3.png';
import student3 from '../../assets/editProfile/student/studentIcon4.png';
import student4 from '../../assets/editProfile/student/studentIcon5.png';
import student5 from '../../assets/editProfile/student/studentIcon6.png';
import student6 from '../../assets/editProfile/student/studentIcon7.png';
import student7 from '../../assets/editProfile/student/studentIcon8.png';
import student8 from '../../assets/editProfile/student/studentIcon9.png';
import student9 from '../../assets/editProfile/student/studentIcon10.png';

type student = {
  id: number;
  name: string;
  help: boolean;
  profileImage: string;
};

const managedList = () => {
  //임시 데이터
  const students: student[] = [
    { id: 1, name: '김민수', help: false, profileImage: student1 },
    { id: 2, name: '이영희', help: true, profileImage: student2 },
    { id: 3, name: '경원핑', help: false, profileImage: student3 },
    { id: 4, name: '최하늘', help: true, profileImage: student4 },
    { id: 5, name: '박지은', help: false, profileImage: student5 },
    { id: 6, name: '현주핑', help: false, profileImage: student6 },
    { id: 7, name: '정수빈', help: true, profileImage: student7 },
    { id: 8, name: '승혜핑', help: false, profileImage: student8 },
    { id: 9, name: '최철수', help: true, profileImage: student9 },
    { id: 10, name: '김미나', help: true, profileImage: student10 },
    { id: 11, name: '정샘물', help: false, profileImage: student11 },
  ];

  return (
    <div className='scrollbar-hide mb-[70px] h-svh overflow-y-auto px-[16px] pt-[16px]'>
      <ul className='flex flex-col gap-6'>
        {students.map((student) => (
          <li key={student.id} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img
                src={student.profileImage}
                alt={student.name}
                className='h-12 w-12 rounded-full'
              />
              <span className='text-[16px] font-medium'>{student.name} </span>
            </div>
            {student.help && (
              <span className='w-[57px] rounded-[4px] bg-helpButtonColor text-center text-[14px] font-bold text-white'>
                Help!
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default managedList;
