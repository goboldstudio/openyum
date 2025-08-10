import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AuthTabs(){
  return (
    <div className="flex border-b border-neutral-200 mb-4">
      <NavLink
        to="/login"
        className={({isActive}) =>
          'px-3 py-2 text-sm ' +
          (isActive ? 'border-b-2 border-neutral-900 font-medium' : 'text-neutral-600 hover:text-neutral-900')
        }
      >Login</NavLink>
      <NavLink
        to="/register"
        className={({isActive}) =>
          'ml-4 px-3 py-2 text-sm ' +
          (isActive ? 'border-b-2 border-neutral-900 font-medium' : 'text-neutral-600 hover:text-neutral-900')
        }
      >Register</NavLink>
    </div>
  )
}
