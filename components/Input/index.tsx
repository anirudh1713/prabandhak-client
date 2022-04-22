/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx';
import React from 'react';

// eslint-disable-next-line max-len
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({className, error, id, label, ...rest}, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label ? (
          <label className="text-sm font-medium text-gray-500" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <input
          id={id}
          className={clsx(
            className,
            'px-4 py-2 rounded ring-2 focus:ring-blue-700 outline-none',
            {'ring-gray-200': !error},
            {'ring-red-700': Boolean(error)},
          )}
          ref={ref}
          {...rest}
        />
        {error ? (
          <span className="text-sm font-medium text-red-700">{error}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
