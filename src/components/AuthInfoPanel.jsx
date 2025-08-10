import React from 'react'

export default function AuthInfoPanel(){
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-xl font-semibold">OpenYum</h2>
      <p className="mt-2 text-sm text-neutral-700">Ad-free community recipes.</p>
      <ul className="mt-4 list-disc pl-5 text-sm text-neutral-700 space-y-1">
        <li>Discover new dishes</li>
        <li>Share your own recipes</li>
        <li>Manage your submissions</li>
      </ul>
    </div>
  )
}
