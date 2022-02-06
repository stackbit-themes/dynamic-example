import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ApiUserResponse } from '../../utils/api-types'
import { fetchUserFlow } from '../../utils/db/user-service'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiUserResponse>) => {
    const session = await getSession({ req })
    if (session) {
      if (req.method !== "GET")
        return res.send({success: false, errorMessage: `Unsupported method: ${req.method}`});
      
      const flowData = await fetchUserFlow(session.user.email);
      const response: ApiUserResponse = {
        success: true,
        user: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            flowData: flowData
        }
      }
      res.send(response);
    } else {
      res.send({success: false, errorMessage: "You are not signed in"})
    } 
}

export default handler;
