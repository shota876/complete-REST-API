import Express from "express";
import { get, merge } from 'lodash'
import { getUserBySessionToken } from "../db/users.ts";

export const isAuthenticated = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try{
        const sessionToken = req.cookies['SHOTA876-AUTH']

        if(!sessionToken) return res.sendStatus(403)

        const existingUser = await getUserBySessionToken(sessionToken)
        
        if(!existingUser) return res.sendStatus(403)

        merge(req, { identify: existingUser })

        return next()
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
}
