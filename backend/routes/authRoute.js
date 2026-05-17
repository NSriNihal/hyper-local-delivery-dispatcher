import express from "express"
import { signIn, signOut, signUp } from "../controllers/authController.js"

const authRouter = express.Router()

//signUp route

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.post("/signout",signOut)


export default authRouter