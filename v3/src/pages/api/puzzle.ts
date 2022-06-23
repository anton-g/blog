import type { NextApiRequest, NextApiResponse } from 'next'

export type PuzzleResponse =
  | {
      error: string
    }
  | {
      success: true
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<PuzzleResponse>) {
  const { code } = req.body

  if (!code) {
    return res.status(400).json({ error: 'invalid' })
  }

  try {
    if (code === 688) {
      return res.status(200).json({ success: true })
    }

    return res.status(400).json({ error: 'invalid' })
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
