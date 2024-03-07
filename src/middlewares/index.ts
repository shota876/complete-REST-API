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



export const isOwner = async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try{
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string

        if(!currentUserId) return res.sendStatus(403)
        if(currentUserId.toString() !== id) return res.sendStatus(403)

        next()
    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}
