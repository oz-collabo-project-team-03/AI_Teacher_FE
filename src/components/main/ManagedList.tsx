import student1 from '../../assets/editProfile/student/studentIcon2.png';
import student2 from '../../assets/editProfile/student/studentIcon3.png';
import student3 from '../../assets/editProfile/student/studentIcon4.png';

//임시 데이터
const students = [
  { id: 1, name: '김민수', help: false, profileImage: student1 },
  { id: 2, name: '이영희', help: true, profileImage: student2 },
  { id: 3, name: '경원핑', help: false, profileImage: student3 },
  { id: 4, name: '김민수', help: false, profileImage: student1 },
  { id: 5, name: '이영희', help: true, profileImage: student2 },
  { id: 6, name: '경원핑', help: false, profileImage: student3 },
  { id: 7, name: '김민수', help: false, profileImage: student1 },
  { id: 8, name: '이영희', help: true, profileImage: student2 },
  { id: 9, name: '경원핑', help: false, profileImage: student3 },
  { id: 10, name: '김민수', help: false, profileImage: student1 },
  { id: 11, name: '이영희', help: true, profileImage: student2 },
  { id: 12, name: '오전삼', help: false, profileImage: student3 },
];

const managedList = () => {
  return (
    <div className='scrollbar-hide mb-[65px] h-svh overflow-y-auto px-[16px] py-[16px]'>
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
