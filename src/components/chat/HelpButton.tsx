import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  type: 'help' | 'end';
  onClick: () => void;
  disabled?: boolean;
};

const HelpButton = ({ type, onClick, disabled = false }: ButtonProps) => {
  const baseButtonStyle =
    'p-[6px] w-[80px] rounded-[4px] font-bold text-white text-[16px] transition-colors duration-300 ease-in-out';

  // 각 타입별 스타일 분리
  const variantHelpButtonStyles =
    'bg-helpButtonColor hover:bg-primaryHoverColor';
  const variantEndButtonStyles = 'bg-cancelButtonColor hover:bg-unFocusColor';

  // 타입에 따라 조건적으로 스타일 선택 (비활성화 시도 HELP 스타일 유지)
  const variantStyles =
    type === 'help' || disabled
      ? variantHelpButtonStyles
      : variantEndButtonStyles;

  // 최종 스타일 병합
  const mergedButtonStyles = twMerge(baseButtonStyle, variantStyles);

  return (
    <button
      className={mergedButtonStyles}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {type === 'help' ? 'Help !' : '상담종료'}
    </button>
  );
};

export default HelpButton;
