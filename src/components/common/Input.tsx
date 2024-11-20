import React, { forwardRef } from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className='w-full rounded-[10px] border-0 px-5 py-[18px] outline-none ring-1 ring-inset ring-inputBorderColor placeholder:text-inputBorderColor focus:ring-2 focus:ring-inset focus:ring-inputFocusColor'
      {...props}
    />
  );
});

export default Input;
