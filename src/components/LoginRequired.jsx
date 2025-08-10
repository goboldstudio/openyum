import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginRequired(){
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm grid place-items-center p-4">
      <div className="max-w-sm w-full rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">→</span>
          <h2 className="text-lg font-semibold">Login Required</h2>
        </div>
        <p className="text-sm text-neutral-700">Please log in to submit a recipe.</p>
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
          <ul className="list-disc pl-5 space-y-1">
            <li>Submit new recipes</li>
            <li>Track your recipe submissions</li>
            <li>Manage your submitted recipes</li>
          </ul>
        </div>
        <div className="mt-6 grid gap-2">
          <Link to="/login" className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm text-center">Log In</Link>
          <Link to="/register" className="px-4 py-2 rounded-xl border border-neutral-300 text-sm text-center hover:bg-neutral-100">Create an Account</Link>
          <Link to="/" className="text-sm text-center underline">Return to Homepage</Link>
        </div>
      </div>
    </div>
  )
}
