// ProtectedRoute.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { hasPermission } from '../service/AdminService';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ requiredPermission }) => {
  const location = useLocation();
  const userHasPermission = hasPermission(requiredPermission);
  // eslint-disable-next-line no-unused-vars
  const user = JSON.parse(localStorage.getItem('user'));

  if (!userHasPermission) {
    return <Navigate to="/admin/error" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
