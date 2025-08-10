import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Recipe(){
  const { id } = useParams()
  const [r, setR] = useState(null)

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single()
      if (!error) setR(data)
    })()
  }, [id])

  if (!r) return <div>Loading…</div>

  const ingredients = (r.ingredients || '').split(',').map(s => s.trim()).filter(Boolean)
  const steps = (r.steps || '').split(';').map(s => s.trim()).filter(Boolean)

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{r.title}</h1>
        {typeof r.cook_time === 'number' && <span className="text-xs rounded-full px-2 py-0.5 border border-neutral-300">{r.cook_time}m</span>}
      </div>
      <div className="text-sm text-neutral-600">{r.description}</div>
      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {ingredients.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </section>
        <section>
          <h3 className="font-semibold mb-2">Steps</h3>
          <ol className="list-decimal ml-5 space-y-1 text-sm">
            {steps.map((st, i) => <li key={i}>{st}</li>)}
          </ol>
        </section>
      </div>
      <div className="text-xs text-neutral-500">Cuisine: {r.cuisine || '—'} • Diet: {r.diet || '—'} • Difficulty: {r.difficulty || '—'}</div>
    </div>
  )
}
