import { Code, LayoutDashboard, MessageSquare, Settings } from 'lucide-react'

const userid = '1234'
const useCount = 1
const MAX_FREE_COUNT = 5

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

export { AITools, SidebarTools, userid, useCount, MAX_FREE_COUNT }
