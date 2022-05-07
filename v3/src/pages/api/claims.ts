import type { NextApiRequest, NextApiResponse } from 'next'
import { getDayAndMinute } from '../../utils/time'

type Response =
  | {
      error: string
    }
  | {}

export type Claim = { x: number; y: number; name: string; minute: number; day: number }

const temp: Claim[] = [
  {
    x: 0.529,
    y: 0.968,
    day: 6,
    minute: getDayAndMinute().minute,
    name: 'foo',
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const { x, y, name } = req.body
    const { day, minute } = getDayAndMinute()

    const claim = { x, y, name, day, minute }

    if (temp.find((x) => x.minute == minute && x.day == minute)) return res.status(401).json({})

    console.log(claim)
    temp.push(claim)

    return res.status(201).json(claim)
  }

  try {
    const { day, minute } = getDayAndMinute()
    // const FORM_ID = process.env.CONVERTKIT_FORM_ID

    // const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    // })

    // if (response.status >= 400) {
    //   console.log(response.body)
    //   return res.status(400).json({
    //     error: `There was an error subscribing to the list.`,
    //   })
    // }

    return res.status(200).json(temp)
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
