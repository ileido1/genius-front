import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export const PrivateRoute = () => {
    const auth = useAuth()
    return auth.isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
}
