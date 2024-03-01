import { getUserByEmail, createUser } from "../db/users.ts";
import Express from "express";
import { authentication, random } from "../helpers/index.ts";



export const register = async (req: Express.Request, res: Express.Response) => {
    try{
        const { email, password, username } = req.body

        if(!email || !password || !username) return res.sendStatus(400)
        
        const existingUser = await getUserByEmail(email)

        if (existingUser) return res.sendStatus(400)

        const salt = random()
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end()
    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const login = async (req: Express.Request, res: Express.Response) => {
    try{
        const { email, password } = req.body

        if(!email || !password) return res.sendStatus(400)

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if(!user) return res.sendStatus(401) 

        // authenticate user without knowing password
        const expectedHash = authentication(user.authentication.salt, password)
        if(user.authentication.password !== expectedHash) return res.sendStatus(403)

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        res.cookie( 'SHOTA876-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })

        return res.status(200).json(user).end()
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
    
    
}