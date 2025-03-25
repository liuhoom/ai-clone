'use client'

import { MobileSidebar } from './mobile-sidebar'
import { UserButton } from '@clerk/nextjs'

export function Navbar() {
  return (
    <div className='flex items-center w-full p-4'>
      <MobileSidebar />

      <div className='flex justify-end w-full'>
        {/* <div className='rounded-full bg-violet-400 p-4' /> */}
        <UserButton />
      </div>
    </div>
  )
}
