import { Navigate } from "react-router-dom"

const ProtectedRoute = ({
    condition,
    redirectPath = '/',
    children
}) => {
    if (!condition) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
}