import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import Dispatch from "../models/dispatchModel.js"

// Assign delivery boy to an order
export const assignDeliveryBoy = async (req, res) => {
    try {
        const { orderId } = req.params
        const { deliveryBoyId, distanceInKm } = req.body

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        const deliveryBoy = await User.findById(deliveryBoyId).select("-password")

        if (!deliveryBoy) {
            return res.status(404).json({ message: "Delivery boy not found" })
        }

        if (deliveryBoy.role !== "deliveryBoy") {
            return res.status(400).json({ message: "Selected user is not a delivery boy" })
        }

        if (!deliveryBoy.isAvailable) {
            return res.status(400).json({ message: "Delivery boy is not available" })
        }

        order.deliveryBoy = deliveryBoyId
        order.status = "assigned"
        await order.save()

        const dispatch = await Dispatch.create({
            order: order._id,
            seller: order.seller,
            deliveryBoy: deliveryBoyId,
            pickupLocation: order.storeLocation || {
                latitude: 0,
                longitude: 0
            },
            dropLocation: order.deliveryLocation,
            distanceInKm: distanceInKm || 0,
            status: "assigned"
        })

        deliveryBoy.isAvailable = false
        await deliveryBoy.save()

        return res.status(200).json({
            message: "Delivery boy assigned successfully",
            order,
            dispatch
        })
    } catch (error) {
        return res.status(500).json({ message: "assignDeliveryBoy error", error })
    }
}

// Get all dispatches
export const getAllDispatches = async (req, res) => {
    try {
        const dispatches = await Dispatch.find()
            .populate("order")
            .populate("seller", "fullName email mobile")
            .populate("deliveryBoy", "fullName email mobile liveLocation")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            count: dispatches.length,
            dispatches
        })
    } catch (error) {
        return res.status(500).json({ message: "getAllDispatches error", error })
    }
}

// Get single dispatch by id
export const getDispatchById = async (req, res) => {
    try {
        const { id } = req.params

        const dispatch = await Dispatch.findById(id)
            .populate("order")
            .populate("seller", "fullName email mobile")
            .populate("deliveryBoy", "fullName email mobile liveLocation")

        if (!dispatch) {
            return res.status(404).json({ message: "Dispatch not found" })
        }

        return res.status(200).json(dispatch)
    } catch (error) {
        return res.status(500).json({ message: "getDispatchById error", error })
    }
}

// Get dispatch by order id
export const getDispatchByOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        const dispatch = await Dispatch.findOne({ order: orderId })
            .populate("order")
            .populate("seller", "fullName email mobile")
            .populate("deliveryBoy", "fullName email mobile liveLocation")

        if (!dispatch) {
            return res.status(404).json({ message: "Dispatch not found for this order" })
        }

        return res.status(200).json(dispatch)
    } catch (error) {
        return res.status(500).json({ message: "getDispatchByOrder error", error })
    }
}

// Update dispatch status
export const updateDispatchStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const allowedStatus = ["assigned", "picked", "dispatched", "delivered", "cancelled"]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid dispatch status" })
        }

        const dispatch = await Dispatch.findById(id)

        if (!dispatch) {
            return res.status(404).json({ message: "Dispatch not found" })
        }

        dispatch.status = status
        await dispatch.save()

        const order = await Order.findById(dispatch.order)

        if (order) {
            order.status = status
            await order.save()
        }

        if (status === "delivered" || status === "cancelled") {
            await User.findByIdAndUpdate(dispatch.deliveryBoy, {
                isAvailable: true
            })
        }

        return res.status(200).json({
            message: "Dispatch status updated successfully",
            dispatch
        })
    } catch (error) {
        return res.status(500).json({ message: "updateDispatchStatus error", error })
    }
}

// Get available delivery boys
export const getAvailableDeliveryBoys = async (req, res) => {
    try {
        const deliveryBoys = await User.find({
            role: "deliveryBoy",
            isAvailable: true
        }).select("-password")

        return res.status(200).json({
            count: deliveryBoys.length,
            deliveryBoys
        })
    } catch (error) {
        return res.status(500).json({ message: "getAvailableDeliveryBoys error", error })
    }
}