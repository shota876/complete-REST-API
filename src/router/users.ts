import Express from 'express';
import { deleteUser, getAllUsers } from '../controllers/users.ts';
import { isAuthenticated, isOwner } from '../middlewares/index.ts';


export default (router: Express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
}