import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Input } from './input';

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6',
          className,
        )}
        ref={ref}
        suffix={
          showPassword ? (
            <EyeOpenIcon
              className="select-none"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeNoneIcon
              className="select-none"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        {...props}
      />
    );
  },
);
InputPassword.displayName = 'InputPassword';

export { InputPassword };
