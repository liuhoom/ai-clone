'use client'

import { MobileSidebar } from './mobile-sidebar'

export function Navbar() {
  return (
    <div className='flex items-center justify-between py-5 px-6'>
      <MobileSidebar />

      <div className='p-4 rounded-full bg-violet-400 cursor-pointer' />
    </div>
  )
}
