import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Admin(){
  const [pending, setPending] = useState([])
  const [role, setRole] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth?.user){ setMsg('Please log in.'); return; }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', auth.user.id).single()
      setRole(profile?.role || 'user')
      if (profile?.role !== 'admin'){ setMsg('You are not an admin.'); return; }
      const { data } = await supabase.from('recipes').select('*').eq('status','pending').order('created_at',{ascending:false})
      setPending(data || [])
    })()
  }, [])

  async function approve(id){
    const { error } = await supabase.from('recipes').update({ status: 'approved' }).eq('id', id)
    if (!error) setPending(list => list.filter(r => r.id !== id))
  }
  async function reject(id){
    // Soft delete: set status to 'rejected' if you add that column; for now, delete
    const { error } = await supabase.from('recipes').delete().eq('id', id)
    if (!error) setPending(list => list.filter(r => r.id !== id))
  }

  if (msg) return <div>{msg}</div>

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Pending Recipes</h1>
      <div className="grid gap-3">
        {pending.length === 0 && <div className="text-sm text-neutral-600">No pending recipes 🎉</div>}
        {pending.map(r => (
          <div key={r.id} className="rounded-xl border border-neutral-200 p-3 bg-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{r.title}</div>
                <div className="text-xs text-neutral-500">by {r.author_name || 'unknown'}</div>
                <div className="text-sm mt-1 line-clamp-2">{r.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>approve(r.id)} className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-sm">Approve</button>
                <button onClick={()=>reject(r.id)} className="px-3 py-1.5 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
