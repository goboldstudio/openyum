import { describe, expect, it } from 'vitest';
import { applyFilters, Filters, Recipe } from './useRecipeFilters';

const recipes: Recipe[] = [
  {
    title: 'Pancakes',
    mealType: ['Breakfast'],
    diet: ['Vegetarian'],
    allergies: ['Gluten-free'],
    dishType: 'Dessert',
    cuisine: 'American',
    difficulty: 'Easy',
    timeMinutes: 20,
    features: ['Image'],
  },
  {
    title: 'Tacos',
    mealType: ['Lunch', 'Dinner'],
    diet: ['Keto'],
    dishType: 'Main Course',
    cuisine: 'Mexican',
    difficulty: 'Moderate',
    timeMinutes: 40,
    features: ['Healthy'],
  },
  {
    title: 'Curry',
    mealType: ['Dinner'],
    diet: ['Vegan'],
    dishType: 'Main Course',
    cuisine: 'Indian',
    difficulty: 'Challenging',
    timeMinutes: 70,
    features: ['Meal Prep'],
  },
];

describe('applyFilters', () => {
  it('returns all recipes when no filters', () => {
    const filters: Filters = {
      meal: [],
      diet: [],
      allergy: [],
      dish: [],
      cuisine: [],
      difficulty: null,
      time: null,
      feat: [],
    };
    expect(applyFilters(recipes, filters)).toHaveLength(3);
  });

  it('filters by meal type multi-select', () => {
    const filters: Filters = {
      meal: ['Breakfast'],
      diet: [],
      allergy: [],
      dish: [],
      cuisine: [],
      difficulty: null,
      time: null,
      feat: [],
    };
    const res = applyFilters(recipes, filters);
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe('Pancakes');
  });

  it('filters by difficulty single-select', () => {
    const filters: Filters = {
      meal: [],
      diet: [],
      allergy: [],
      dish: [],
      cuisine: [],
      difficulty: 'Moderate',
      time: null,
      feat: [],
    };
    const res = applyFilters(recipes, filters);
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe('Tacos');
  });

  it('filters by time', () => {
    const filters: Filters = {
      meal: [],
      diet: [],
      allergy: [],
      dish: [],
      cuisine: [],
      difficulty: null,
      time: '30 minutes or less',
      feat: [],
    };
    const res = applyFilters(recipes, filters);
    expect(res).toHaveLength(1);
    expect(res[0].title).toBe('Pancakes');
  });
});
