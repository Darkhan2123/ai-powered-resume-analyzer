import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // If auth is loading, show a loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // Check if user is authenticated and has the required role
  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to the appropriate dashboard based on user role
    if (user) {
      if (user.role === 'job_seeker') {
        return <Navigate to="/dashboard" replace />;
      } else if (user.role === 'recruiter') {
        return <Navigate to="/recruiter/dashboard" replace />;
      } else if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
      }
    }
    // If user doesn't exist, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user has the required role, render the protected route
  return <Outlet />;
};

export default RoleRoute;