import React from 'react'
import { Link } from 'react-router-dom'
import AuthBox from '../components/AuthBox.jsx'

export default function Home(){
  return (
    <div className="grid gap-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h1 className="text-2xl font-bold">Welcome to OpenYum</h1>
        <p className="mt-2 text-neutral-700">The simple, ad-free home for community-driven recipes.</p>
        <div className="mt-4 flex items-center gap-3">
          <Link to="/browse" className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm">Browse Recipes</Link>
          <Link to="/submit" className="px-4 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">Submit Recipe</Link>
          <Link to="/admin" className="px-4 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-neutral-100">Admin</Link>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">Browse & Discover</h3>
          <p className="text-sm text-neutral-700">Explore hundreds of user-submitted recipes, each with clear ingredient lists and step-by-step instructions.</p>
        </div>
        <div>
          <h3 className="font-semibold">Share Your Own</h3>
          <p className="text-sm text-neutral-700">Submit your favorite recipes in seconds with a clean, distraction-free form.</p>
        </div>
        <div>
          <h3 className="font-semibold">Supported, Not Spam</h3>
          <p className="text-sm text-neutral-700">We partner with brands for Supporter Recipes—never banner ads. Thoughtfully curated, always optional.</p>
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="font-semibold">Login</h2>
        <AuthBox />
      </section>
    </div>
  )
}
