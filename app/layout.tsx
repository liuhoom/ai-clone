import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI-Saas',
  description: 'TONGYI AI SAAS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#6F5AF6',
        },
        layout: {
          logoPlacement: 'none',
        },
      }}
      afterSignOutUrl='/sign-in'
    >
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
