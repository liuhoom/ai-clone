'use client'

import { MessageSquare } from 'lucide-react'
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

import { cn } from '@/lib/utils'
import { Loading } from '@/components/loading'
import { Empty } from '@/components/empty'
import { useRouter } from 'next/navigation'
import UserAvatar from '@/components/user-avatar'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'sonner'

const conversationFromSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
})

export default function ConversationPage() {
  const proModal = useProModal()
  const router = useRouter()
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

  const form = useForm<z.infer<typeof conversationFromSchema>>({
    resolver: zodResolver(conversationFromSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof conversationFromSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      })

      setMessages((msg) => [...msg, userMessage, response.data])

      console.log(newMessages)
    } catch (error) {
      // if (axios.isAxiosError(error) && error?.response?.status === 403) proModal.onOpen()
      if (true) proModal.onOpen()
      else toast.error('Something went wrong.' + error)
    } finally {
      form.reset()
      router.refresh()
    }
  }

  return (
    <div className='px-4 lg:px-8'>
      <Heading
        title='Conversation'
        description='Our most advanced conversation model.'
        icon={MessageSquare}
        color='text-violet-500'
        bgColor='bg-violet-500/10'
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
                      placeholder='How do I calculate the radius of a circle?'
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
            {message.role === 'user' ? (
              <UserAvatar />
            ) : (
              <div className='p-4 w-fit rounded-full bg-red-400' />
            )}

            <p className='text-sm'>
              {message.content as unknown as React.ReactNode}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
