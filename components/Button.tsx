
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
    outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className || ''}`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};
