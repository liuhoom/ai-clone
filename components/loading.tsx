import Image from 'next/image'

export function Loading() {
  return (
    <div className='mt-4 w-full p-8 flex flex-col bg-gray-100 text-center rounded-lg items-center justify-center gap-y-4'>
      <Image
        src='/logo.png'
        alt='logo'
        width={38}
        height={38}
        className='animate-spin'
      />
      <p className='text-sm text-muted-foreground'>Genius is thinking...</p>
    </div>
  )
}
