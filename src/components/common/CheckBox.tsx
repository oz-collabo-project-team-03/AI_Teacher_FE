type CheckBoxProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'id'>;

const CheckBox = (props: CheckBoxProps) => {
  const { children, ...rest } = props;
  return (
    <label className='flex min-w-0 flex-1 cursor-pointer items-center text-textMainColor'>
      <input
        type='checkBox'
        className='mr-[10px] size-4 cursor-pointer rounded border-[#DEDEDE] text-primaryHoverColor focus:ring-transparent'
        {...rest}
      />
      {children}
    </label>
  );
};
export default CheckBox;
