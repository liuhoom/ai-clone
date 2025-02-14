'use client'

import { Menu } from 'lucide-react'
import { Sidebar } from '@/components/sidebar'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from '@/components/ui/button'

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='p-0 bg-gray-900'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
