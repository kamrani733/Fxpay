import { Search } from 'lucide-react';
import type { TransactionType } from '@transactions/shared';

type TypeFilter = TransactionType | 'all';

export function Filters({
  filters,
  onChange,
}: {
  filters: { q: string; type: TypeFilter };
  onChange: (patch: Partial<{ q: string; type: TypeFilter }>) => void;
}) {
  return (
    <div className="filters">
      <label className="search-box">
        <Search size={18} aria-hidden />
        <input
          value={filters.q}
          onChange={(event) => onChange({ q: event.target.value })}
          placeholder="Search descriptions"
          aria-label="Search descriptions"
        />
      </label>
      <div className="segmented" aria-label="Transaction type filter">
        {(['all', 'income', 'expense'] as TypeFilter[]).map((type) => (
          <button
            key={type}
            type="button"
            className={filters.type === type ? 'active' : ''}
            onClick={() => onChange({ type })}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
