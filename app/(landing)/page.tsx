'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Facebook, Github, Instagram, Twitter, X } from 'lucide-react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import TypewriterComponent from 'typewriter-effect'

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
})

const TESTIMONIALS = [
  {
    name: 'Carlos',
    jobTitle: 'Marketing Specialist',
    desciption:
      'This application has significantly boosted our marketing efforts.',
  },
  {
    name: 'B',
    jobTitle: 'Marketing Specialist',
    desciption:
      'As a student, this app has been a lifesaver for organizing my tasks and schedules.',
  },
  {
    name: 'C',
    jobTitle: 'Marketing Specialist',
    desciption:
      'The efficiency and reliability of this tool are unparalleled. Highly recommended!',
  },
  {
    name: 'D',
    jobTitle: 'Marketing Specialist',
    desciption: 'Incredible features and user-friendly design. Love it!',
  },
]

export default function LandingPage() {
  return (
    <div className='h-full w-full'>
      {/* Navbar */}
      <nav className='p-4  flex justify-between items-center'>
        <div className='flex space-x-4'>
          <div className='relative h-8 w-8'>
            <Image src='/logo.png' fill alt='logo' />
          </div>

          <h1
            className={cn(
              'text-2xl font-bold text-white',
              montserrat.className
            )}
          >
            Genius
          </h1>
        </div>

        <div className='flex gap-x-4'>
          <Link href='/dashboard'>
            <Button variant='outline' className='rounded-full'>
              Get Started
            </Button>
          </Link>
          <Link href='https://github.com'>
            <Button size='default' className='rounded-full'>
              <div className='h-6 w-6 font-bold flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                >
                  <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                  <path d='M9 18c-4.51 2-5-2-7-2'></path>
                </svg>
              </div>
              {/* <Github className='w-5 h-5' /> */}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className='py-36 text-white text-center font-bold space-y-5'>
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-5'>
          <h1 className=''>The Best AI Tool for</h1>
          <div className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>
            <TypewriterComponent
              options={{
                strings: ['ChatBot.', 'Coversation.', 'Code Generation.'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>

        <div className='text-sm md:text-xl font-light text-zinc-400'>
          Create content using AI 10X faster.
        </div>

        <Button
          size='lg'
          className='rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:text-lg p-4 md:p-6 font-semibold'
        >
          <Link href='/dashboard'>Start Generating For Free</Link>
        </Button>

        <p className='text-sm font-light text-zinc-400'>
          No credit card required.
        </p>
      </div>

      {/* Testimonials */}
      <div className='text-center text-white'>
        <h1 className='text-xl md:text-4xl font-extrabold'>Testimonials</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8 gap-x-4'>
        {TESTIMONIALS.map((testimonials) => (
          <Card
            className='text-white border-none bg-[#192339] mt-2'
            key={testimonials.name}
          >
            <CardHeader>
              <CardTitle className='flex items-center mb-4 gap-x-2'>
                <div className='bg-red-400 p-5 rounded-full ml-0' />

                <div className='flex flex-col justify-start'>
                  <h3 className='text-lg'>{testimonials.name}</h3>
                  <p className='text-xs text-zinc-400'>
                    {testimonials.jobTitle}
                  </p>
                </div>
              </CardTitle>

              <CardContent className='pt-4 px-0'>
                {testimonials.desciption}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>

      <footer className='flex items-center justify-between mt-20 p-8'>
        <Link href='/' className='flex items-center'>
          <Image src='/logo.png' alt='logo footer' height={32} width={32} />
        </Link>

        <div className='text-white items-center'>
          &copy; <span className='font-bold'>Genius</span>  {new Date().getFullYear()}. All rights reserved.
        </div>

        <div className='flex space-x-4 text-white'>
          <Facebook className='w-6 h-6 cursor-pointer'/>
          <Twitter className='w-6 h-6 cursor-pointer'/>
          <Instagram className='w-6 h-6 cursor-pointer'/>
          <Github className='w-6 h-6 cursor-pointer'/>
        </div>
      </footer>
    </div>
  )
}
