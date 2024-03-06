import Express from "express";
import authentication from "./authentication";
import users from "./users";

const router = Express.Router()

export default (): Express.Router => {
    authentication(router)
    users(router)
    return router
}