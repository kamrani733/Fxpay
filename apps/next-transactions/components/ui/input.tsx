import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full min-w-0 rounded-lg border border-[#243445] bg-[#0b1118] px-3 text-[#edf4fb] outline-none placeholder:text-[#617284] focus:border-[#7cb7ff]',
        className,
      )}
      {...props}
    />
  );
}
