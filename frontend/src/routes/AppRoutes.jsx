import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/auth/login.jsx"
import Home from "../pages/user/Home.jsx"
import SellerDashboard from "../pages/seller/SellerDashboard.jsx"
import MyStore from "../pages/seller/MyStore.jsx"
import Products from "../pages/seller/Products.jsx"
import SellerOrders from "../pages/seller/SellerOrders.jsx"
import DispatchOrders from "../pages/seller/DispatchOrders.jsx"
import StoreDetails from "../pages/user/StoreDetails.jsx"
import MyOrders from "../pages/user/MyOrders.jsx"
import TrackOrder from "../pages/user/TrackOrder.jsx"
import Profile from "../pages/user/Profile.jsx"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Home />} />

            <Route path="/seller" element={<Navigate to="/seller/dashboard" replace />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/store" element={<MyStore />} />
            <Route path="/seller/products" element={<Products />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/seller/dispatch" element={<DispatchOrders />} />
            <Route path="/stores/:storeId" element={<StoreDetails />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/track/:orderId" element={<TrackOrder />} />
            <Route path="/profile" element={<Profile />} />
            
        </Routes>
    )
}

export default AppRoutes