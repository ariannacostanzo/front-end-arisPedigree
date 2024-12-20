import { useAuth } from "../providers/authProvider";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const UserAuth = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ errorMessage: 'You must be logged in!', redirectTo: location.pathname }} />
    }

    return <Outlet />
}
export default UserAuth;