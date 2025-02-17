'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

import { AITools } from '@/lib/config'

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className='h-full'>
      <div className='text-center space-y-4 mb-8'>
        <div className='text-2xl md:text-4xl font-bold'>
          Explore the power of AI
        </div>

        <div className='text-sm md:text-lg font-light text-muted-foreground'>
          Chat with the smartest AI - Experience the power of AI.
        </div>
      </div>

      <div className='space-y-4 px-4 md:px-20 lg:px-32'>
        {AITools.map((item) => (
          <Card
            key={item.name}
            className='p-4 flex items-center gap-x-4 cursor-pointer shadow-sm hover:shadow-md transition border-black/5 rounded-lg'
            onClick={() => router.push(item.href)}
          >
            <div className={cn('p-2 w-fit rounded-md', item.bgColor)}>
              <item.icon className={cn('h-8 w-8', item.color)} />
            </div>
            <div className='font-semibold flex-1'>{item.name}</div>

            <ArrowRight className='h-5 w-5 text-zinc-600' />
          </Card>
        ))}
      </div>
    </div>
  )
}
