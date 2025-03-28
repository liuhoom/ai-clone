import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

import { getUserApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

export default async function ComponentName({
  children,
}: {
  children: React.ReactNode
}) {
  const apiLimitCount = await getUserApiLimit()
  const isPro = await checkSubscription()

  return (
    <div className='h-full relative'>
      <div className='hidden bg-gray-900 h-full md:flex md:flex-col md:w-72 md:fixed inset-y-0'>
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>

      <div className='md:pl-72'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
