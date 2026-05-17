
import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connetDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoute.js"
import cors from "cors"
const app = express()  //now we can access express functionalities through app
const port = process.env.PORT || 5000 //accessing from .env file
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())  //converting data into json
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.listen(port,()=>{
    connetDb()
    console.log("server Started at ",port);
})

