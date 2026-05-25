import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null
    const token = bearerToken || req.cookies?.token
    if (!token) {
      return res.status(400).json({ message: "token not found" })
    }
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    if (!decoded) {
      return res.status(400).json({ message: "token not verified" })
    }
    const user = await User.findById(decoded.userId)
    if (!user) return res.status(403).json({ message: "User not found" })
    req.userId = user._id
    req.userRole = user.role
    next()
  } catch (error) {
    return res.status(500).json({ message: "isAuth error" })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null
    const token = bearerToken || req.cookies?.token
    if (!token) {
      return res.status(400).json({ message: "token not found" })
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY)
    if (!decoded) {
      return res.status(400).json({ message: "token not verified" })
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(403).json({ message: "User not found" })
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" })
    }

    req.userId = user._id
    req.userRole = user.role
    next()
  } catch (error) {
    return res.status(500).json({ message: "isAdmin error" })
  }
}

export default isAuth
