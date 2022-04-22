/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, {useMemo} from 'react';
import clsx from 'clsx';
import LoadingIndicator from '../LoadingIndicator';

type Theme = 'primary';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  rightIcon?: JSX.Element;
  isLoading?: boolean;
}

const Button = ({
  children,
  className,
  rightIcon,
  isLoading = false,
  ...rest
}: IButtonProps) => {
  // * useMemo is probably overkill here.
  const icon = useMemo(() => {
    if (isLoading) return <LoadingIndicator />;
    return rightIcon;
  }, [isLoading, rightIcon]);

  return (
    <button
      className={clsx(
        className,
        'flex items-center space-x-4 px-8 py-3 overflow-hidden text-white bg-blue-700 rounded group active:bg-blue-600 focus:outline-none focus:ring',
        {'opacity-80': isLoading},
      )}
      disabled={isLoading}
      {...rest}
    >
      <span className="text-base font-medium">{children}</span>

      {icon ? <span>{icon}</span> : null}
    </button>
  );
};

export default Button;
