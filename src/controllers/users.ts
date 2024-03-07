import Express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users.ts";

export const getAllUsers = async (req: Express.Request, res: Express.Response) => {
    try{
        const users = await getUsers()

        return res.status(200).json(users)
    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: Express.Request, res: Express.Response) => {
    try{
        const { id } = req.params
        const deletedUser = await deleteUserById(id)

        return res.json(deletedUser)
    }catch(error){
        console.log(error)
        return res.sendStatus(400)
    }
}
