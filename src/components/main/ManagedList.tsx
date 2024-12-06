import studentDefaultIcon from '@assets/editProfile/student/studentDefaultIcon.png';

type Student = {
  id: number;
  name: string;
  profileImage: string;
  help: boolean;
};

type ManagedListProps = {
  students: Student[];
};

const managedList: React.FC<ManagedListProps> = ({ students }) => {
  return (
    <div className='custom-scrollbar h-full overflow-y-auto px-[16px] py-[16px]'>
      <ul className='flex flex-col gap-6'>
        {students.map((student) => (
          <li key={student.id} className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img
                src={student.profileImage || studentDefaultIcon}
                alt={student.name}
                className='h-12 w-12 rounded-full'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = studentDefaultIcon;
                }}
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
