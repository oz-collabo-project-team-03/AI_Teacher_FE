import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  type: 'help' | 'end';
  onClick: () => void;
};

const HelpButton = ({ type, onClick }: ButtonProps) => {
  const baseButtonStyle =
    'p-[6px] w-[80px] rounded-[4px] font-bold text-white text-[16px] transition-colors duration-300 ease-in-out';

  // 각 타입별 스타일 분리
  const variantHelpButtonStyles =
    'bg-helpButtonColor hover:bg-primaryHoverColor';
  const variantEndButtonStyles = 'bg-cancelButtonColor hover:bg-unFocusColor';

  // 타입에 따라 조건적으로 스타일 선택
  const variantStyles =
    type === 'help' ? variantHelpButtonStyles : variantEndButtonStyles;

  const mergedButtonStyles = twMerge(baseButtonStyle, variantStyles);

  return (
    <button className={mergedButtonStyles} onClick={onClick}>
      {type === 'help' ? 'Help !' : '상담종료'}
    </button>
  );
};

export default HelpButton;
