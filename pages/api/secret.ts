import type { NextApiRequest, NextApiResponse } from 'next'

type Response =
  | {
      error: string
    }
  | {
      value: 'foo'
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { pink, green, red } = req.body

  if (!pink || !green || !red) {
    return res
      .status(400)
      .json({ error: "Ah ah ah, you didn't say the magic word!" })
  }

  if (pink === 'blue' && green === 'red' && red === 'yellow') {
    return res.status(200).json({
      value: 'foo',
    })
  }

  return res
    .status(400)
    .json({ error: "Ah ah ah, you didn't say the magic word!" })
}
