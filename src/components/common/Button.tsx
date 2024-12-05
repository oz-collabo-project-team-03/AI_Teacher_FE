import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'active' | 'cancel';

type ButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'variant'> & {
  variant?: ButtonVariant;
};
const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant = props.disabled ? 'cancel' : 'active',
    ...rest
  } = props;

  const variantStyles = {
    active: 'bg-primaryColor text-white hover:bg-primaryHoverColor',
    cancel: 'bg-cancelButtonColor text-white hover:bg-cancelButtonHoverColor',
  };

  return (
    <>
      <button
        className={twMerge(
          `flex w-full cursor-pointer items-center justify-center rounded-lg py-3.5 transition-colors`,
          variantStyles[variant],
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
