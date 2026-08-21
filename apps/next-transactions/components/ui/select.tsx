import * as React from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-11 w-full min-w-0 rounded-lg border border-[#243445] bg-[#0b1118] px-3 text-[#edf4fb] outline-none focus:border-[#7cb7ff]',
        className,
      )}
      {...props}
    />
  );
}
