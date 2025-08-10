import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type Recipe = {
  title: string;
  mealType?: string[];
  diet?: string[];
  allergies?: string[];
  dishType?: string;
  cuisine?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  timeMinutes?: number;
  features?: string[];
};

export type Filters = {
  meal: string[];
  diet: string[];
  allergy: string[];
  dish: string[];
  cuisine: string[];
  difficulty: string | null;
  time: string | null;
  feat: string[];
};

const defaultFilters: Filters = {
  meal: [],
  diet: [],
  allergy: [],
  dish: [],
  cuisine: [],
  difficulty: null,
  time: null,
  feat: [],
};

const STORAGE_KEY = 'recipeFilters';

const parseCsv = (v: string | null): string[] => (v ? v.split(',').filter(Boolean) : []);

export const useRecipeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  // hydrate from URL or localStorage
  useEffect(() => {
    const params: Filters = {
      meal: parseCsv(searchParams.get('meal')),
      diet: parseCsv(searchParams.get('diet')),
      allergy: parseCsv(searchParams.get('allergy')),
      dish: parseCsv(searchParams.get('dish')),
      cuisine: parseCsv(searchParams.get('cuisine')),
      difficulty: searchParams.get('difficulty'),
      time: searchParams.get('time'),
      feat: parseCsv(searchParams.get('feat')),
    };

    const hasParams = Array.from(searchParams.keys()).length > 0;
    if (hasParams) {
      setFilters(params);
    } else {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Filters;
          setFilters({ ...defaultFilters, ...parsed });
        } catch {
          setFilters(defaultFilters);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync to URL and localStorage
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.meal.length) params.meal = filters.meal.join(',');
    if (filters.diet.length) params.diet = filters.diet.join(',');
    if (filters.allergy.length) params.allergy = filters.allergy.join(',');
    if (filters.dish.length) params.dish = filters.dish.join(',');
    if (filters.cuisine.length) params.cuisine = filters.cuisine.join(',');
    if (filters.difficulty) params.difficulty = filters.difficulty;
    if (filters.time) params.time = filters.time;
    if (filters.feat.length) params.feat = filters.feat.join(',');
    setSearchParams(params);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters, setSearchParams]);

  const setFilter = (key: keyof Filters, value: string[] | string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value as any }));
  };

  const toggleFilter = (key: keyof Filters, option: string) => {
    setFilters((prev) => {
      const current = Array.isArray(prev[key]) ? (prev[key] as string[]) : [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [key]: next as any };
    });
  };

  const clearAll = () => setFilters(defaultFilters);

  const isActive = useMemo(() => {
    return (
      filters.meal.length > 0 ||
      filters.diet.length > 0 ||
      filters.allergy.length > 0 ||
      filters.dish.length > 0 ||
      filters.cuisine.length > 0 ||
      !!filters.difficulty ||
      !!filters.time ||
      filters.feat.length > 0
    );
  }, [filters]);

  return { filters, setFilter, toggleFilter, clearAll, isActive };
};

export const applyFilters = (recipes: Recipe[], filters: Filters): Recipe[] => {
  return recipes.filter((r) => {
    if (filters.meal.length && !filters.meal.some((m) => (r.mealType || []).includes(m))) {
      return false;
    }
    if (filters.diet.length && !filters.diet.some((m) => (r.diet || []).includes(m))) {
      return false;
    }
    if (filters.allergy.length && !filters.allergy.some((m) => (r.allergies || []).includes(m))) {
      return false;
    }
    if (filters.dish.length && !(filters.dish.includes(r.dishType || ''))) {
      return false;
    }
    if (filters.cuisine.length && !(filters.cuisine.includes(r.cuisine || ''))) {
      return false;
    }
    if (filters.difficulty && r.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.time) {
      const t = r.timeMinutes || 0;
      switch (filters.time) {
        case '15 minutes or less':
          if (t > 15) return false;
          break;
        case '30 minutes or less':
          if (t > 30) return false;
          break;
        case '45 minutes or less':
          if (t > 45) return false;
          break;
        case '60 minutes or less':
          if (t > 60) return false;
          break;
        case 'Over 60 minutes':
          if (t <= 60) return false;
          break;
      }
    }
    if (filters.feat.length && !filters.feat.some((f) => (r.features || []).includes(f))) {
      return false;
    }
    return true;
  });
};
