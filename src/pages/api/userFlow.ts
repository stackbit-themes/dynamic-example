import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ApiBaseResponse } from '../../utils/api-types'
import { storeUserFlow } from '../../utils/db/user-service'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiBaseResponse>) => {
    const session = await getSession({ req })
    if (session) {
      if (req.method !== "POST")
        return res.send({success: false, errorMessage: `Unsupported method: ${req.method}`});

      const flowData = req.body;
      await storeUserFlow(session.user.email, flowData);
      res.send({success: true});     
    } else {
      res.send({success: false, errorMessage: "You are not signed in"})
    } 
}

export default handler;
