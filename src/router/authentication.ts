import Express from "express";
import { register } from "../controllers/authentication.ts";

export default(router: Express.Router) => {
    router.post('/auth/register', register)
}