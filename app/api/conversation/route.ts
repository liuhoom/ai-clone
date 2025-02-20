import { type NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'

import { userid } from '@/lib/config'
import { increaseApiLimit } from '@/lib/api-limit'

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!userid) {
      return new NextResponse('Unauthorized.', { status: 401 })
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return new NextResponse('OpenAI API key not configured.', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Messages are required.', { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'deepseek-v3',
      // model: 'qwen-plus',
      messages,
    })

    await increaseApiLimit()

    return new NextResponse(JSON.stringify(response.choices[0].message), {
      status: 200,
    })
  } catch (error: any) {
    console.error('[CONVERSATION]: ', error)
    return new NextResponse(error, { status: 500 })
  }
}
