import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const IconButton = ({ children, ...props }: IconButtonProps) => (
  <button
    {...props}
    className={
      'p-2 rounded-full transition-colors ' +
      (props.disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed ' : 'hover:bg-gray-100 ') +
      (props.className || '')
    }
    type={props.type || 'button'}
  >
    {children}
  </button>
); 