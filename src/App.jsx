import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import Submit from './pages/Submit.jsx'
import Admin from './pages/Admin.jsx'
import Contact from './pages/Contact.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import Support from './pages/Support.jsx'
import Recipe from './pages/Recipe.jsx'
import Login from './pages/Login.jsx'

function NavItem({ to, children }){
  return (
    <NavLink to={to} className={({isActive}) =>
      'px-3 py-2 rounded-lg text-sm ' +
      (isActive ? 'bg-neutral-200' : 'hover:bg-neutral-100')
    }>{children}</NavLink>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-7 w-7 rounded-lg bg-neutral-900 text-white grid place-items-center">OY</div>
            <span>OpenYum</span>
          </div>
          <nav className="ml-auto flex items-center gap-1">
            <NavItem to="/browse">Browse</NavItem>
            <NavItem to="/submit">Submit Recipe</NavItem>
            <NavItem to="/support">Support</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            <NavItem to="/terms">Terms</NavItem>
            <NavItem to="/privacy">Privacy</NavItem>
            <NavLink to="/login" className="px-3 py-2 text-sm text-neutral-600 underline-offset-2 hover:underline">Login</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>OpenYum • Ad-free, community recipes</div>
          <div className="flex items-center gap-3">
            <a className="underline-offset-2 hover:underline" href="/contact">Contact</a>
            <a className="underline-offset-2 hover:underline" href="/terms">Terms</a>
            <a className="underline-offset-2 hover:underline" href="/privacy">Privacy</a>
            <a className="underline-offset-2 hover:underline" href="/support">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
