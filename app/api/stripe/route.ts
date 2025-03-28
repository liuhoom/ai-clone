import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
export async function GET() {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription = db.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    if (!userSubscription) {
      await db.userSubscription.create({
        data: {
          userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })
    }
  } catch {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
