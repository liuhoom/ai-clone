'use client'

import { Menu } from 'lucide-react'

import { Sidebar } from '@/components/sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type MobileSidebarProps = {
  apiLimitCount: number
  isPro: boolean
}
export function MobileSidebar({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='p-0 text-white'>
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  )
}
