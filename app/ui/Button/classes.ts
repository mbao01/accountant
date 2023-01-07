import type { ButtonProps } from './types';

export const sizes = {
  lg: "rounded-md px-8 py-3 text-sm h-12",
  md: "rounded-md px-6 py-2 text-xs h-10",
  sm: "rounded-md px-4 py-2 text-xs h-8",
} satisfies Record<NonNullable<ButtonProps['size']>, string>;

export const variants = {
    primary: 'bg-purple-500 hover:bg-purple-600 text-white',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
}  satisfies Record<NonNullable<ButtonProps['variant']>, string>;

export const outlines = {
    primary: 'bg-white text-purple-500 border border-purple-500 hover:bg-purple-100 shadow-current',
    secondary: 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-100 shadow-current',
    danger: 'bg-white text-red-500 border border-red-500 hover:bg-red-100 shadow-current',
    success: 'bg-white text-green-500 border border-green-500 hover:bg-green-100 shadow-current',
    warning: 'bg-white text-yellow-500 border border-yellow-500 hover:bg-yellow-100 shadow-current',
}  satisfies Record<NonNullable<ButtonProps['variant']>, string>;

export const disabledClasses = {
    solid: 'bg-gray-400 text-white pointer-events-none cursor-not-allowed',
    outline: 'border border-gray-500 text-gray-500 pointer-events-none cursor-not-allowed',
}