import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type TInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
  type: 'text' | 'password' | 'email' | 'number' | 'date';
  label?: string;
  labelClassName?: string;
};

const AuthInput: React.FC<TInputProps> = ({
  label,
  labelClassName,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between rounded-[10px] border-0 px-[14px] py-[8px] outline-none ring-1 ring-inset',
        isFocused
          ? 'ring-2 ring-inputFocusColor'
          : 'ring-inputBorderColor placeholder:text-inputBorderColor'
      )}
      onClick={handleContainerClick}
      tabIndex={0}
    >
      {label && (
        <label
          className={twMerge(
            'flex-grow text-sm font-medium',
            labelClassName || ''
          )}
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        className='w-9/12 rounded-[10px] border-0 outline-none ring-0 ring-inset ring-inputBorderColor placeholder:text-inputBorderColor focus:ring-0 focus:ring-inset'
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </div>
  );
};

export default AuthInput;
