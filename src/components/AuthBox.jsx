import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthBox(){
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  async function signIn(e){
    e.preventDefault()
    setMsg('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMsg(error.message)
    else setMsg('Check your email for the login link.')
  }

  async function signOut(){
    await supabase.auth.signOut()
    setMsg('Signed out.')
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <form onSubmit={signIn} className="flex gap-2 items-center">
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="rounded-xl border border-neutral-300 px-3 py-2 flex-1" />
        <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm">Log in</button>
        <button type="button" onClick={signOut} className="px-3 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">Log out</button>
      </form>
      {msg && <div className="mt-2 text-sm">{msg}</div>}
    </div>
  )
}
