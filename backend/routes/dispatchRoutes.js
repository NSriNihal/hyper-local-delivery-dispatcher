import express from "express"
import {
    assignDeliveryBoy,
    getAllDispatches,
    getDispatchById,
    getDispatchByOrder,
    updateDispatchStatus,
    getAvailableDeliveryBoys
} from "../controllers/dispatchController.js"

import { isAdmin } from "../middlewares/isAuth.js"

const dispatchRouter = express.Router()

dispatchRouter.get("/", isAdmin, getAllDispatches)
dispatchRouter.get("/available-delivery-boys", isAdmin, getAvailableDeliveryBoys)
dispatchRouter.get("/:id", isAdmin, getDispatchById)
dispatchRouter.get("/order/:orderId", isAdmin, getDispatchByOrder)

dispatchRouter.post("/assign/:orderId", isAdmin, assignDeliveryBoy)
dispatchRouter.put("/:id/status", isAdmin, updateDispatchStatus)

export default dispatchRouter