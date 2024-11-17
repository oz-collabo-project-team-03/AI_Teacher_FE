import { useId } from 'react';

type CheckBoxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'id'>;

const CheckBox = (props: CheckBoxProps) => {
  const uid = useId();
  const { children, ...rest } = props;
  return (
    <div className='flex items-center'>
      <input
        id={uid}
        type='checkBox'
        className='size-4 rounded border-[#DEDEDE] text-primaryHoverColor focus:ring-transparent'
        {...rest}
      />
      <label
        htmlFor={uid}
        className='ml-[10px] min-w-0 flex-1 text-textMainColor'
      >
        {children}
      </label>
    </div>
  );
};
export default CheckBox;
