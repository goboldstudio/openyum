import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import LoginRequired from '../components/LoginRequired.jsx'

export default function Submit(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [diet, setDiet] = useState('None')
  const [meal, setMeal] = useState('Dinner')
  const [cuisine, setCuisine] = useState('')
  const [cookTime, setCookTime] = useState(30)
  const [difficulty, setDifficulty] = useState('Easy')
  const [msg, setMsg] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
  }, [])

  async function handleSubmit(e){
    e.preventDefault()
    setMsg('')
    // NOTE: Due to RLS, inserting requires an authenticated user (created_by = auth.uid()).
    // This simple form inserts a guest submission as pending with no created_by (will fail if RLS blocks it).
    // For production, require login before submit or add a server component.
    const { data: user } = await supabase.auth.getUser()
    const created_by = user?.user?.id || null
    const author_name = user?.user?.email || 'guest'
    const { error } = await supabase.from('recipes').insert({
      title, description,
      ingredients,
      steps,
      tags: ['user'],
      cuisine,
      diet,
      meal_type: meal,
      cook_time: cookTime,
      difficulty,
      status: created_by ? 'pending' : 'pending',
      author_name,
      created_by
    })
    if (error){
      setMsg('Submission failed. Please log in before submitting.')
    } else {
      setMsg('Submitted! Your recipe is pending approval.')
      setTitle(''); setDescription(''); setIngredients(''); setSteps(''); setCuisine('')
    }
  }

  if (!loading && !user) return <LoginRequired />

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Submit a Recipe</h1>
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input className="rounded-xl border border-neutral-300 px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
          <textarea className="rounded-xl border border-neutral-300 px-3 py-2" placeholder="Short description" value={description} onChange={e=>setDescription(e.target.value)} />
          <textarea className="rounded-xl border border-neutral-300 px-3 py-2" placeholder="Ingredients (comma-separated)" value={ingredients} onChange={e=>setIngredients(e.target.value)} />
          <textarea className="rounded-xl border border-neutral-300 px-3 py-2" placeholder="Steps (separate with semicolons)" value={steps} onChange={e=>setSteps(e.target.value)} />
          <div className="grid md:grid-cols-4 gap-3">
            <input className="rounded-xl border border-neutral-300 px-3 py-2" placeholder="Cuisine" value={cuisine} onChange={e=>setCuisine(e.target.value)} />
            <select className="rounded-xl border border-neutral-300 px-3 py-2" value={diet} onChange={e=>setDiet(e.target.value)}>
              {['None','Vegetarian','Vegan','Pescatarian','Gluten-Free','Keto'].map(d => <option key={d}>{d}</option>)}
            </select>
            <select className="rounded-xl border border-neutral-300 px-3 py-2" value={meal} onChange={e=>setMeal(e.target.value)}>
              {['Breakfast','Lunch','Dinner','Snack','Dessert'].map(m => <option key={m}>{m}</option>)}
            </select>
            <input type="number" className="rounded-xl border border-neutral-300 px-3 py-2" placeholder="Cook time (min)" value={cookTime} onChange={e=>setCookTime(Number(e.target.value))} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <select className="rounded-xl border border-neutral-300 px-3 py-2" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
              {['Easy','Medium','Hard'].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm">Submit</button>
        </form>
        {msg && <div className="mt-3 text-sm">{msg}</div>}
      </div>
      <p className="text-xs text-neutral-600">Note: Submissions require login due to database security rules. We’ll wire the login button next.</p>
    </div>
  )
}
