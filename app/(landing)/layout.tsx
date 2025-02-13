export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full bg-[#111827] overflow-auto'>
      <div className='max-w-screen-xl mx-auto'>{children}</div>
    </div>
  )
}
