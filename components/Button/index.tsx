/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import clsx from 'clsx';

type Theme =
  'primary';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  rightIcon?: JSX.Element;
}

const Button = ({
  children, className, rightIcon, ...rest
}: IButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        'relative inline-flex items-center px-8 py-3 overflow-hidden text-white bg-blue-700 rounded group active:bg-blue-600 focus:outline-none focus:ring',
      )}
      {...rest}
    >
      {rightIcon ? (
        <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
          {rightIcon}
        </span>
      ) : null}

      <span
        className={clsx(
          'text-base font-medium transition-all',
          { 'group-hover:mr-4': rightIcon },
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
