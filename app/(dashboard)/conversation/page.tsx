'use client'

import { MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormControl, FormItem } from '@/components/ui/form'

import { Loading } from '@/components/loading'
import { Empty } from '@/components/empty'

const conversationFromSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
})

export default function ConversationPage() {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])

  const form = useForm<z.infer<typeof conversationFromSchema>>({
    resolver: zodResolver(conversationFromSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

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
            // onSubmit={form.handleSubmit()}
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

            <Button size='lg' className='col-span-12 md:col-span-2'>
              Generate
            </Button>
          </form>
        </Form>
      </div>

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Empty */}
      {messages.length === 0 && true && <Empty />}
    </div>
  )
}
