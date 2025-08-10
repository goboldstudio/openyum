import React from 'react';

export interface FilterChipProps {
  label: string;
  active: boolean;
  onToggle: () => void;
  ariaPressed?: boolean;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, active, onToggle, ariaPressed }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={ariaPressed ?? active}
      className={`rounded-full border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        active
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-gray-300 bg-white hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
};

export default FilterChip;
