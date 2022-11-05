import type { NextApiRequest, NextApiResponse } from 'next'

type Response =
  | {
      error: string
    }
  | {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_KEY = process.env.CONVERTKIT_API_KEY
    const API_URL = process.env.CONVERTKIT_API_URL

    if (!FORM_ID || !API_KEY || !API_URL) {
      console.error('Missing required env for subscription:', {
        FORM_ID,
        API_KEY,
        API_URL,
      })
      return res.status(405).json({
        error: `Bad Request `,
      })
    }

    const data = { email, api_key: API_KEY }

    const response = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the list.`,
      })
    }

    return res.status(201).json({})
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
