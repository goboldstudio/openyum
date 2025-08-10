import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Browse(){
  const [recipes, setRecipes] = useState([])
  const [q, setQ] = useState('')
  const [diet, setDiet] = useState('')
  const [meal, setMeal] = useState('')
  const [maxTime, setMaxTime] = useState(180)
  const [page, setPage] = useState(1)
  const perPage = 24

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(200)
      if (!error) setRecipes(data || [])
    })()
  }, [])

  const filtered = recipes.filter(r => {
    const hay = [r.title, r.description, r.ingredients, r.steps, (r.tags||[]).join(' ')].join(' ').toLowerCase()
    const matchesQ = q ? hay.includes(q.toLowerCase()) : true
    const matchesDiet = diet ? (r.diet||'').toLowerCase() === diet.toLowerCase() : true
    const matchesMeal = meal ? (r.meal_type||'').toLowerCase() === meal.toLowerCase() : true
    const matchesTime = typeof r.cook_time === 'number' ? r.cook_time <= maxTime : true
    return matchesQ && matchesDiet && matchesMeal && matchesTime
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 grid gap-3 md:grid-cols-4">
        <input value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} placeholder="Search title, ingredients, tags…" className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300 md:col-span-2" />
        <select value={diet} onChange={e=>{setDiet(e.target.value); setPage(1)}} className="rounded-xl border border-neutral-300 px-3 py-2">
          <option value="">Any diet</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Pescatarian</option>
          <option>Gluten-Free</option>
          <option>Keto</option>
          <option>None</option>
        </select>
        <select value={meal} onChange={e=>{setMeal(e.target.value); setPage(1)}} className="rounded-xl border border-neutral-300 px-3 py-2">
          <option value="">Any meal</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
          <option>Dessert</option>
        </select>
        <div className="flex items-center gap-3 md:col-span-2">
          <label className="text-sm text-neutral-600">Max time</label>
          <input type="range" min={0} max={240} step={5} value={maxTime} onChange={e=>{setMaxTime(Number(e.target.value)); setPage(1)}} className="w-full" />
          <div className="text-sm w-16 text-right">{maxTime}m</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map(r => (
          <article key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-4 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold leading-tight line-clamp-2">{r.title}</h3>
              {typeof r.cook_time === 'number' && <span className="text-xs rounded-full px-2 py-0.5 border border-neutral-300">{r.cook_time}m</span>}
            </div>
            <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{r.description}</p>
            <div className="mt-3 text-xs text-neutral-500">
              <span>{r.meal_type || '—'}</span> • <span>{r.diet || '—'}</span>
            </div>
            <Link to={`/recipe/${r.id}`} className="mt-3 inline-block text-sm underline underline-offset-2">View recipe</Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-sm rounded-lg border border-neutral-300 disabled:opacity-50">Previous</button>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 text-sm rounded-lg border border-neutral-300 disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  )
}
