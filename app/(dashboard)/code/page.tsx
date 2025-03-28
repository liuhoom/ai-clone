'use client'

import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormControl, FormItem } from '@/components/ui/form'
import UserAvatar from '@/components/user-avatar'

import { cn } from '@/lib/utils'
import { Loading } from '@/components/loading'
import { Empty } from '@/components/empty'
import { useRouter } from 'next/navigation'

const codeFromSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
})

export default function CodePage() {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof codeFromSchema>>({
    resolver: zodResolver(codeFromSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof codeFromSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/code', {
        messages: newMessages,
      })

      setMessages((msg) => [...msg, userMessage, response.data])

      console.log(newMessages)
    } catch (error) {
      console.log(error)
    } finally {
      form.reset()
      router.refresh()
    }
  }

  return (
    <div className='px-4 lg:px-8'>
      <Heading
        title='Code Generation'
        description='Generate code using descriptive text.'
        icon={Code}
        color='text-green-700'
        bgColor='bg-green-700/10'
      />

      <div className='mt-8'>
        <Form {...form}>
          <form
            className='py-4 px-3 md:px-6 grid grid-cols-12 w-full border rounded-lg gap-2 items-center'
            autoComplete='off'
            autoCapitalize='off'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name='prompt'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-12 md:col-span-10'>
                  <FormControl className='m-0 p-0'>
                    <Input
                      disabled={isLoading}
                      aria-disabled={isLoading}
                      className='w-full col-span-12 border-0 outline-none text-sm focus-visible:ring-0 focus-visible:ring-transparent shadow-none'
                      placeholder='Simple toggle button using React hooks.'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              size='lg'
              className='col-span-12 md:col-span-2'
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Empty */}
      {messages.length === 0 && !isLoading && <Empty />}

      {/* content area */}
      <div className='gap-y-4 flex flex-col-reverse mt-4'>
        {messages.map((message, i) => (
          <div
            className={cn(
              'p-4 w-full flex rounded-lg gap-x-4 items-center',
              message.role === 'user'
                ? 'bg-white border border-black/10'
                : 'bg-muted'
            )}
            key={i}
          >
            <div
              className={cn(
                'p-4 w-fit rounded-full',
                message.role === 'user' ? 'bg-blue-400' : 'bg-red-400'
              )}
            />

            {message.role === 'user' ? <UserAvatar /> : 'bg-red-400'}
            <p className='text-sm'>
              {message.content as unknown as React.ReactNode}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
