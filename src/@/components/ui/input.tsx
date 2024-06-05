import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            'relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-2.5 top-2.5">{suffix}</div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
