import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ role }) {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role && userRole?.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/" />;
    }


    // ✅ Allowed
    return <Outlet />
}

export default ProtectedRoutes;