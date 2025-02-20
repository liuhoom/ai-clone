import { MAX_FREE_COUNT, userid as userId } from '@/lib/config'
import { db } from '@/lib/db'

const increaseApiLimit = async () => {
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
  if (!userId) return 0

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  return userApiLimit?.count || 0
}

export { increaseApiLimit, getUserApiLimit }
