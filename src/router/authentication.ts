import Express from "express";
import { login, register } from "../controllers/authentication.ts";

export default(router: Express.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}