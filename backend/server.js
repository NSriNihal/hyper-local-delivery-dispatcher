
import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, ".env") })
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoute.js"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import adminRouter from "./routes/adminRoutes.js"
import dispatchRouter from "./routes/dispatchRoutes.js"
import earningRouter from "./routes/earningRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import sellerRouter from "./routes/sellerRoutes.js"
import storeRouter from "./routes/storeRoutes.js"
import trackingRouter from "./routes/trackingRoutes.js"
import deliveryBoyRouter from "./routes/deliveryBoyRoutes.js"

const app = express()  //now we can access express functionalities through app
const port = process.env.PORT || 5000 //accessing from .env file
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())  //converting data into json
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/dispatch", dispatchRouter)
app.use("/api/earnings", earningRouter)
app.use("/api/orders", orderRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/stores", storeRouter)
app.use("/api/tracking", trackingRouter)
app.use("/api/delivery-boy", deliveryBoyRouter)

const startServer = async () => {
    try {
        await connectDb()
        app.listen(port, () => {
            console.log("server Started at ", port)
        })
    } catch (error) {
        console.error("Server startup error", error)
        process.exit(1)
    }
}

startServer()

