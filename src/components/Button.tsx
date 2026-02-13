import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'sm';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'default',
  children,
  className = '',
  ...props
}) => {
  const classes = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`.trim();
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
