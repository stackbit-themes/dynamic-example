import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ApiUserResponse } from '../../utils/api-types'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiUserResponse>) => {
    const session = await getSession({ req })
    if (session) {
      const response: ApiUserResponse = {
        success: true,
        user: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image
        }
      }
      res.send(response);
    } else {
      res.send({success: false, errorMessage: "You are not signed in"})
    } 
}

export default handler;
