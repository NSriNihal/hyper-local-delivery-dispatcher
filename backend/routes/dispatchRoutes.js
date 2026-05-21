import express from "express"
import {
    assignDeliveryBoy,
    getAllDispatches,
    getDispatchById,
    getDispatchByOrder,
    updateDispatchStatus,
    getAvailableDeliveryBoys
} from "../controllers/dispatchController.js"

import isAuth from "../middlewares/isAuth.js"

const dispatchRouter = express.Router()

dispatchRouter.get("/", isAuth, getAllDispatches)
dispatchRouter.get("/available-delivery-boys", isAuth, getAvailableDeliveryBoys)
dispatchRouter.get("/:id", isAuth, getDispatchById)
dispatchRouter.get("/order/:orderId", isAuth, getDispatchByOrder)

dispatchRouter.post("/assign/:orderId", isAuth, assignDeliveryBoy)
dispatchRouter.put("/:id/status", isAuth, updateDispatchStatus)

export default dispatchRouter