import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

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

export { increaseApiLimit, getUserApiLimit }
