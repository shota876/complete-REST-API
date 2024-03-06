import Express from 'express';
import { getAllUsers } from '../controllers/users.ts';
import { isAuthenticated } from '../middlewares/index.ts';


export default (router: Express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
}