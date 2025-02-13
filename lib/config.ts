import { Code, LayoutDashboard, MessagesSquare, Settings } from 'lucide-react'

const AITools = [
  {
    name: 'Conversation',
    href: '/conversation',
    icon: MessagesSquare,
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
]

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
]

export { AITools, SidebarTools }
