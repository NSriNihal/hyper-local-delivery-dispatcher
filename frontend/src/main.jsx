import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { installAuthRedirectGuard } from "./api/authApi"
import { AuthProvider } from "./context/AuthContext"
import "./index.css"

installAuthRedirectGuard()

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)