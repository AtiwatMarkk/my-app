import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'black' | 'outline';
    isLoading?: boolean;
    loadingText?: string;
}

const Button = ({
    variant = 'primary',
    isLoading = false,
    loadingText = 'Processing...',
    className = '',
    children,
    disabled,
    ...props
}: ButtonProps) => {
    let variantStyle = "";
    if (variant === 'primary') {
        variantStyle = (disabled || isLoading)
            ? "bg-[#8BCDEA] text-white cursor-not-allowed font-bold"
            : "bg-[#0AA6E8] hover:bg-[#088bc2] text-white shadow-md hover:shadow-lg active:scale-[0.99] font-bold";
    } else if (variant === 'secondary') {
        variantStyle = "text-gray-900 bg-white border-2 border-slate-200 hover:bg-slate-50 font-bold";
    } else if (variant === 'black') {
        variantStyle = "bg-black text-white hover:bg-gray-900";
    } else if (variant === 'outline') {
        variantStyle = "bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50 font-semibold";
    }

    const baseStyle = variant === 'outline'
        ? "transition-all flex items-center justify-center"
        : "py-4 px-6 rounded-lg transition-all flex items-center justify-center transform";

    return (
        <button
            disabled={disabled || isLoading}
            className={`${baseStyle} ${variantStyle} ${className}`}
            {...props}
        >
            {isLoading ? loadingText : children}
        </button>
    );
}

export default Button;
