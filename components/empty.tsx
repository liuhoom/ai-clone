import Image from 'next/image'

export function Empty() {
  return (
    <div className='p-20 h-full flex flex-col items-center justify-center gap-y-4'>
      <Image src='/logo.png' width={288} height={288} alt='empty' />

      <p className='text-muted-foreground text-sm'>No conversation started.</p>
    </div>
  )
}
