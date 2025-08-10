import React, { useEffect, useState } from 'react';
import FilterChip from './FilterChip';

export interface FilterGroupProps {
  title: string;
  options: string[];
  value: string[] | string | null;
  onChange: (value: string[] | string | null) => void;
  multi?: boolean;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  value,
  onChange,
  multi = false,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setOpen(mql.matches);
    const handler = (e: MediaQueryListEvent) => setOpen(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handleToggle = (option: string) => {
    if (multi) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      onChange(next);
    } else {
      const current = typeof value === 'string' ? value : null;
      const next = current === option ? null : option;
      onChange(next);
    }
  };

  const isActive = (option: string) => {
    if (multi) {
      return Array.isArray(value) && value.includes(option);
    }
    return value === option;
  };

  return (
    <details open={open} className="space-y-2">
      <summary className="font-medium cursor-pointer md:cursor-default list-none">
        {title}
      </summary>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterChip
            key={option}
            label={option}
            active={isActive(option)}
            ariaPressed={isActive(option)}
            onToggle={() => handleToggle(option)}
          />
        ))}
      </div>
    </details>
  );
};

export default FilterGroup;
