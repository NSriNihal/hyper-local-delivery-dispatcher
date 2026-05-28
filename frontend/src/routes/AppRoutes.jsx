import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/auth/login.jsx"
import SellerDashboard from "../pages/seller/SellerDashboard.jsx"
import MyStore from "../pages/seller/MyStore.jsx"
import Products from "../pages/seller/Products.jsx"
import SellerOrders from "../pages/seller/SellerOrders.jsx"
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seller" element={<Navigate to="/seller/dashboard" replace />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/store" element={<MyStore />} />
            <Route path="/seller/products" element={<Products />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
        </Routes>
    )
}

export default AppRoutes