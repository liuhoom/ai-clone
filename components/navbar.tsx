'use client'

import { MobileSidebar } from './mobile-sidebar'

export function Navbar() {
  return (
    <div className='flex items-center w-full p-4'>
      <MobileSidebar />

      <div className='flex justify-end w-full'>
        <div className='rounded-full bg-violet-400 p-4' />
      </div>
    </div>
  )
}
