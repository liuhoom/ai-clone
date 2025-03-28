import { UserButton } from '@clerk/nextjs'

import { MobileSidebar } from './mobile-sidebar'
import { getUserApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

export async function Navbar() {
  const apiLimitCount = await getUserApiLimit()
  const isPro = await checkSubscription()

  return (
    <div className='flex items-center w-full p-4'>
      <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />

      <div className='flex justify-end w-full'>
        {/* <div className='rounded-full bg-violet-400 p-4' /> */}
        <UserButton />
      </div>
    </div>
  )
}
