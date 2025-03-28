import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { MAX_FREE_COUNT } from './config'

const increaseApiLimit = async () => {
  const { userId } = await auth()

  if (!userId) return

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    })
  } else {
    await db.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    })
  }
}

const getUserApiLimit = async () => {
  const { userId } = await auth()
  if (!userId) return 0

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  return userApiLimit?.count || 0
}

const checkApiLimit = async () => {
  const { userId } = await auth()
  if (!userId) return false

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  return !userApiLimit || userApiLimit.count < MAX_FREE_COUNT
}

export { increaseApiLimit, getUserApiLimit, checkApiLimit }
