import { backIcon } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  title: string;
  rightElement?: React.ReactNode;
};

const Header = ({ title, rightElement }: HeaderProps) => {
  const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate(-1);
  // };
  return (
    <header className='fixed top-0 z-10 flex h-[72px] w-full items-center justify-between border-b border-borderColor bg-white px-2 md:w-[425px]'>
      <div className='flex items-center'>
        <button
          onClick={() => navigate(-1)}
          type='button'
          className='mr-2 hover:opacity-70'
        >
          <img src={backIcon} alt='' />
        </button>

        <h1 className='text-xl font-medium'>{title}</h1>
      </div>

      {/* 오른쪽 영역: rightElement가 있으면 표시, 없으면 빈 공간 */}
      <div className='h-6 cursor-pointer transition hover:opacity-70'>
        {rightElement}
      </div>
    </header>
  );
};
export default Header;
