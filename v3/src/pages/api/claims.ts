import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import Filter from 'bad-words'
import { getDayAndMinute } from '../../utils/time'

const wordFilter = new Filter()
const prisma = new PrismaClient()

type Response =
  | {
      error: string
    }
  | {}

export type Claim = { x: number; y: number; name: string; minute: number; day: number }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const { x, y, name } = req.body
    const { day, minute } = getDayAndMinute()

    const claim = { x, y, name: wordFilter.clean(name).slice(0, 22), day, minute }

    const existingClaim = await prisma.waveClaim.findFirst({
      where: {
        AND: [{ minute: minute }, { day: day }],
      },
    })

    if (existingClaim) return res.status(401).json({})

    await prisma.waveClaim.create({
      data: claim,
    })

    return res.status(201).json(claim)
  }

  try {
    const claims = await prisma.waveClaim.findMany()

    return res.status(200).json(claims)
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
