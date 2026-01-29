import React from 'react'

export default function Navbar() {
  const liSytle = "cursor-pointer hover:font-bold transition-all duration-75"
  return (
  <nav className='flex justify-between bg-violet-900 text-white py-3'>
    <div className='logo'>
      <span className='font-bold text-2xl mx-9'>iTask</span>
    </div>
    <ul className='flex justify-between gap-10 mx-9'>
      <li className={liSytle}>Home</li>
      <li className={liSytle}>Tasks</li>
    </ul>
  </nav>
  )
}
