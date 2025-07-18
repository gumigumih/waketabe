import React from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
};

export const Checkbox = ({ children, ...props }: CheckboxProps) => (
  <label className={'inline-flex items-center gap-1 ' + (props.className || '')}>
    <input type="checkbox" {...props} />
    {children && <span>{children}</span>}
  </label>
); 