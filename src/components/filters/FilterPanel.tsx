import React from 'react';
import FilterGroup from './FilterGroup';
import { Filters } from '../../hooks/useRecipeFilters';

interface FilterPanelProps {
  filters: Filters;
  setFilter: (key: keyof Filters, value: string[] | string | null) => void;
  clearAll: () => void;
  isActive: boolean;
}

const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
const dietOptions = ['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Low-carb', 'Healthy'];
const allergyOptions = ['Gluten-free', 'Dairy-free', 'Nut-free', 'Egg-free', 'Soy-free'];
const dishOptions = ['Appetizer', 'Main Course', 'Side Dish', 'Dessert', 'Salad', 'Soup', 'Snack', 'Beverage', 'Bread', 'Sauce'];
const cuisineOptions = ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'French', 'Mediterranean', 'Japanese', 'Thai', 'Greek'];
const difficultyOptions = ['Easy', 'Moderate', 'Challenging'];
const timeOptions = ['15 minutes or less', '30 minutes or less', '45 minutes or less', '60 minutes or less', 'Over 60 minutes'];
const featureOptions = ['Image', 'Healthy', 'Meal Prep'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  setFilter,
  clearAll,
  isActive,
}) => {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filter Recipes</h2>
        {isActive && (
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <FilterGroup
          title="Meal Type"
          options={mealOptions}
          value={filters.meal}
          onChange={(v) => setFilter('meal', v)}
          multi
        />
        <FilterGroup
          title="Diet"
          options={dietOptions}
          value={filters.diet}
          onChange={(v) => setFilter('diet', v)}
          multi
        />
        <FilterGroup
          title="Allergies"
          options={allergyOptions}
          value={filters.allergy}
          onChange={(v) => setFilter('allergy', v)}
          multi
        />
        <FilterGroup
          title="Dish Type"
          options={dishOptions}
          value={filters.dish}
          onChange={(v) => setFilter('dish', v)}
          multi
        />
        <FilterGroup
          title="Cuisine"
          options={cuisineOptions}
          value={filters.cuisine}
          onChange={(v) => setFilter('cuisine', v)}
          multi
        />
        <FilterGroup
          title="Difficulty"
          options={difficultyOptions}
          value={filters.difficulty}
          onChange={(v) => setFilter('difficulty', v)}
        />
        <FilterGroup
          title="Time"
          options={timeOptions}
          value={filters.time}
          onChange={(v) => setFilter('time', v)}
        />
        <FilterGroup
          title="Features"
          options={featureOptions}
          value={filters.feat}
          onChange={(v) => setFilter('feat', v)}
          multi
        />
      </div>
    </section>
  );
};

export default FilterPanel;
