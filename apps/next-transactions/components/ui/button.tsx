import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost';
};

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-65',
        variant === 'default' && 'bg-[#7cb7ff] text-[#071019] hover:bg-[#9bc8ff]',
        variant === 'outline' && 'border border-[#243445] bg-[#0b1118] text-[#edf4fb] hover:bg-[#16212d]',
        variant === 'ghost' && 'bg-transparent text-[#9cadbd] hover:bg-[#16212d] hover:text-[#edf4fb]',
        className,
      )}
      {...props}
    />
  );
}
