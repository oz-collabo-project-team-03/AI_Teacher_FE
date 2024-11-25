type MainHeaderProps = {
  className?: string;
};

const MainHeader = ({ className }: MainHeaderProps) => {
  return (
    <header
      className={`top-0 flex h-[72px] w-full items-center justify-center border-b border-borderColor bg-white md:w-[425px] ${className}`}
    >
      <h1 className='font-gMarket text-[30px]'>수행쌤</h1>
    </header>
  );
};

export default MainHeader;
