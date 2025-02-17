import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface HeadingProps {
  title: string
  description: string
  bgColor: string
  color: string
  icon: LucideIcon
}

export function Heading({
  title,
  description,
  bgColor,
  color,
  icon: Icon,
}: HeadingProps) {
  return (
    <div className='flex gap-x-2'>
      <div className={cn('p-2 w-fit rounded-md', bgColor)}>
        <Icon className={cn('h-10 w-10', color)} />
      </div>

      <div className='flex flex-col ml-1'>
        <h2 className='font-bold text-3xl'>{title}</h2>
        <p className='text-muted-foreground text-sm'>{description}</p>
      </div>
    </div>
  )
}
