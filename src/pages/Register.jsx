import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthTabs from '../components/AuthTabs.jsx'
import AuthInfoPanel from '../components/AuthInfoPanel.jsx'

export default function Register(){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newsletter, setNewsletter] = useState(false)

  const isValid = username && email && password

  function handleSubmit(e){
    e.preventDefault()
    // registration logic placeholder
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <AuthTabs />
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" required />
          </div>
          <div className="flex items-start gap-2">
            <input id="newsletter" type="checkbox" checked={newsletter} onChange={e=>setNewsletter(e.target.checked)} className="mt-1" />
            <div>
              <label htmlFor="newsletter" className="text-sm">Sign up for our newsletter</label>
              <p className="text-xs text-neutral-500">Occasional updates. You can unsubscribe anytime.</p>
            </div>
          </div>
          <button disabled={!isValid} className="mt-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed">Register</button>
        </form>
        <div className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="underline">Login</Link>
        </div>
      </div>
      <AuthInfoPanel />
    </div>
  )
}
