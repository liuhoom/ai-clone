'use client'

import { Sidebar } from '@/components/sidebar'

export default function ComponentName({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full relative'>
      <div className='hidden bg-gray-900 h-full md:flex md:flex-col md:w-72 md:fixed inset-y-0'>
        <Sidebar />
      </div>

      <div className='md:pl-72'>{children}</div>
    </div>
  )
}
