import { useNavigate } from 'react-router-dom';
import { backIcon } from '../../assets/assets';

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
    <header className='flex items-center justify-between border-b border-borderColor bg-white px-2 py-6'>
      <div className='flex items-center'>
        <button onClick={() => navigate(-1)} className='mr-2'>
          <img src={backIcon} alt='' />
        </button>

        <h1 className='text-xl font-medium'>{title}</h1>
      </div>

      {/* 오른쪽 영역: rightElement가 있으면 표시, 없으면 빈 공간 */}
      <div className='w-6 cursor-pointer'>{rightElement}</div>
    </header>
  );
};
export default Header;
