import { Zap } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from './ui/button'

import { MAX_FREE_COUNT, useCount } from '@/lib/config'
import { getUserApiLimit } from '@/lib/api-limit'

export function FreeCounter() {
  return (
    <Card className='bg-white/10 border-0 rounded-lg'>
      <CardContent className='py-6 text-white text-center space-y-4'>
        <p className='text-sm -mb-2'>
          {getUserApiLimit()} / {MAX_FREE_COUNT} Free Generations
        </p>

        <Progress
          value={(getUserApiLimit() / MAX_FREE_COUNT) * 100}
          className='h-3 bg-white'
        />

        <Button
          size='lg'
          className='w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        >
          Upgrade
          <Zap className='w-4 h-4 fill-white' />
        </Button>
      </CardContent>
    </Card>
  )
}
