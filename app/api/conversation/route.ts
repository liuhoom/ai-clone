import { type NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { auth } from '@clerk/nextjs/server'

import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    const { userId } = await auth()

    if (!userId) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return new NextResponse('OpenAI API key not configured.', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Messages are required.', { status: 400 })
    }

    const isPro = await checkSubscription()
    const freeTrial = await checkApiLimit()

    if (!isPro && !freeTrial) {
      return new NextResponse('Free trial has expired.', { status: 403 })
    }

    const response = await openai.chat.completions.create({
      model: 'deepseek-v3',
      // model: 'qwen-plus',
      messages,
    })

    console.log(response)

    // const response = {
    //   choices: [
    //     {
    //       message: [Object],
    //       finish_reason: 'stop',
    //       index: 0,
    //       logprobs: null,
    //     },
    //   ],
    //   object: 'chat.completion',
    //   usage: { prompt_tokens: 5, completion_tokens: 14, total_tokens: 19 },
    //   created: 1743151767,
    //   system_fingerprint: null,
    //   model: 'deepseek-v3',
    //   id: 'chatcmpl-941683e1-1310-96ea-b90a-1cf806c18e74',
    // }

    if (!isPro) await increaseApiLimit()

    return new NextResponse(JSON.stringify(response.choices[0].message), {
      status: 200,
    })
  } catch (error: any) {
    console.error('[CONVERSATION]: ', error)
    return new NextResponse(error, { status: 500 })
  }
}
