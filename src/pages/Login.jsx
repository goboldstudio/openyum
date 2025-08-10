import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthTabs from '../components/AuthTabs.jsx'
import AuthInfoPanel from '../components/AuthInfoPanel.jsx'

export default function Login(){
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    // login logic placeholder
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <AuthTabs />
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium">Username or Email</label>
            <input type="text" value={identifier} onChange={e=>setIdentifier(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" required />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-sm underline">Forgot password?</a>
            </div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" required />
          </div>
          <button className="mt-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm">Login</button>
        </form>
        <div className="mt-4 text-sm text-center">
          Don’t have an account? <Link to="/register" className="underline">Register</Link>
        </div>
      </div>
      <AuthInfoPanel />
    </div>
  )
}
