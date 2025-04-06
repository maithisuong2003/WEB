// ProtectedRoute.jsx
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { hasPermission } from '../service/AdminService';

const ProtectedRoute = ({ requiredPermission }) => {
  const location = useLocation();
  const userHasPermission = hasPermission(requiredPermission);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!userHasPermission) {
    return <Navigate to="/admin/error" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
