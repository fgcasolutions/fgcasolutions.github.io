import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => (
  <button className="bg-muted-green text-white px-3 py-1 rounded" {...props}>
    {label}
  </button>
);
