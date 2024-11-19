import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  type: 'help' | 'end';
  onClick: () => void;
};

const HelpButton: React.FC<ButtonProps> = ({ type, onClick }) => {
  const baseButtonStyle =
    'p-[6px] w-[80px] rounded-[4px] font-bold text-white text-[16px] transition-colors duration-300 ease-in-out';

  const variantButtonStyles =
    (type === 'help' && 'bg-helpButtonColor hover:bg-primaryHoverColor') ||
    (type === 'end' && 'bg-cancelButtonColor hover:bg-unFocusColor');

  const mergedButtonStyles = twMerge(baseButtonStyle, variantButtonStyles);

  return (
    <button className={mergedButtonStyles} onClick={onClick}>
      {(type === 'help' && 'Help !') || '상담종료'}
    </button>
  );
};

export default HelpButton;
