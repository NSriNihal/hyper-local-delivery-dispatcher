import express from "express"
import { getCurrentUser } from "../controllers/userControllers"
import verifyToken from "../middlewares/verifyToken.js"


const userRouter = express.Router()

//signUp route


userRouter.get("/current", verifyToken, getCurrentUser)


export default  userRouter