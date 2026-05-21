import express from "express"
import {
    getAdminStats,
    getAllUsers,
    getAllOrders,
    getAllStores,
    getAllDeliveryPartners,
    updateUserRole,
    deleteUser
} from "../controllers/adminController.js"

import isAuth from "../middlewares/isAuth.js"

const adminRouter = express.Router()

adminRouter.get("/stats", isAuth, getAdminStats)

adminRouter.get("/users", isAuth, getAllUsers)
adminRouter.put("/users/:id/role", isAuth, updateUserRole)
adminRouter.delete("/users/:id", isAuth, deleteUser)

adminRouter.get("/orders", isAuth, getAllOrders)
adminRouter.get("/stores", isAuth, getAllStores)
adminRouter.get("/delivery-partners", isAuth, getAllDeliveryPartners)

export default adminRouter