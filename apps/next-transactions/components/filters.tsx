import { Search } from 'lucide-react';
import type { TransactionType } from '@transactions/shared';
import { Button } from './ui/button';
import { Input } from './ui/input';

type TypeFilter = TransactionType | 'all';

export function Filters({
  filters,
  onChange,
}: {
  filters: { q: string; type: TypeFilter };
  onChange: (patch: Partial<{ q: string; type: TypeFilter }>) => void;
}) {
  return (
    <div className="flex justify-between gap-3 border-b border-[#243445] p-4 max-sm:flex-col">
      <label className="flex min-w-[min(360px,100%)] items-center gap-2.5 rounded-lg border border-[#243445] bg-[#0b1118] px-3 text-[#9cadbd]">
        <Search size={18} aria-hidden />
        <Input
          className="h-10 border-0 px-0"
          value={filters.q}
          onChange={(event) => onChange({ q: event.target.value })}
          placeholder="Search descriptions"
          aria-label="Search descriptions"
        />
      </label>
      <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#243445]" aria-label="Transaction type filter">
        {(['all', 'income', 'expense'] as TypeFilter[]).map((type) => (
          <Button
            key={type}
            type="button"
            variant="ghost"
            className={`min-h-10 min-w-[72px] rounded-none border-r border-[#243445] capitalize last:border-r-0 ${
              filters.type === type ? 'bg-[#16212d] text-[#edf4fb]' : 'text-[#9cadbd]'
            }`}
            onClick={() => onChange({ type })}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}
