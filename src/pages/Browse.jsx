import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import FilterPanel from '../components/filters/FilterPanel';
import { useRecipeFilters, applyFilters, Recipe } from '../hooks/useRecipeFilters';

export default function Browse() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { filters, setFilter, clearAll, isActive } = useRecipeFilters();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(200);
      if (!error) setRecipes((data as any) || []);
    })();
  }, []);

  const filtered = applyFilters(recipes, filters);
  const featured = recipes.slice(0, 6);
  const display = isActive ? filtered : featured;

  return (
    <div className="space-y-6">
      <FilterPanel
        filters={filters}
        setFilter={setFilter}
        clearAll={clearAll}
        isActive={isActive}
      />

      <hr className="border-t border-neutral-200" />

      {isActive ? (
        <p className="text-sm text-neutral-600">{filtered.length} results</p>
      ) : (
        <h2 className="text-lg font-semibold">Featured Recipes</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {display.map((r: any) => (
          <article
            key={r.id}
            className="rounded-2xl border border-neutral-200 bg-white p-4 hover:shadow-sm transition"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight line-clamp-2">{r.title}</h3>
              {typeof r.timeMinutes === 'number' || typeof r.cook_time === 'number' ? (
                <span className="text-xs rounded-full px-2 py-0.5 border border-neutral-300">
                  {r.timeMinutes ?? r.cook_time} min
                </span>
              ) : null}
            </div>
            {'rating' in r && (
              <div className="mt-1 text-sm text-yellow-500">
                {('★'.repeat(Math.round(r.rating || 0)))}
              </div>
            )}
            {r.description && (
              <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{r.description}</p>
            )}
            <div className="mt-3 text-xs text-neutral-500">
              <span>{r.meal_type || r.mealType?.join(', ') || '—'}</span> •{' '}
              <span>{r.diet || (r.diet ? r.diet.join(', ') : '—')}</span>
            </div>
            <Link
              to={`/recipe/${r.id}`}
              className="mt-3 inline-block text-sm underline underline-offset-2"
            >
              View recipe
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
