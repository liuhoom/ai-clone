'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

// import { SidebarTools } from '@/lib/config'
import { Code, LayoutDashboard, MessageSquare, Settings } from 'lucide-react'

const AITools = [
  {
    name: 'Conversation',
    href: '/conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    name: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
] as const

const SidebarTools = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500',
  },
  ...AITools,
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    color: '',
  },
] as const

const inter = Montserrat({
  weight: '600',
  subsets: ['latin'],
})

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className='flex text-white flex-col h-full'>
      {/* header */}
      <Link href='/dashboard' className='flex items-center gap-x-4 p-6'>
        <Image src='/logo.png' alt='logo' height={32} width={32} />
        <h1 className={cn('text-2xl font-bold', inter.className)}>Genius</h1>
      </Link>

      {/* toolbars */}
      <div className='mt-8 space-y-1 px-3 flex-1'>
        {SidebarTools.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex p-3 rounded-lg text-sm hover:bg-white/10 hover:text-white items-center w-full font-medium transition',
              pathname === item.href
                ? 'bg-white/10 text-white'
                : 'text-zinc-400'
            )}
          >
            <div className='flex gap-x-3'>
              <item.icon className={cn('h-5 w-5', item.color)} />
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      {/* pro */}
      <div className='px-6'>isPro</div>
    </div>
  )
}
