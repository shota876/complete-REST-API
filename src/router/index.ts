import Express from "express";
import authentication from "./authentication";

const router = Express.Router()

export default (): Express.Router => {
    authentication(router)
    return router
}