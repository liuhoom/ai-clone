'use client'

import { Menu } from 'lucide-react'

import { Sidebar } from '@/components/sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='p-0 text-white'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
