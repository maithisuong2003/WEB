import React from 'react';
import './assets/css/main.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AdminFooter from './layout/AdminFooter.jsx';
import AdminHeader from './layout/AdminHeader.jsx';
import AdminHomePage from './pages/AdminHomePage.jsx';
import AdminAccountComponent from './components/AdminAccountComponent.jsx';
import AdminProductComponent from './components/AdminProductComponent.jsx';
import AdminOrderComponent from './components/AdminOrderComponent.jsx';
import AdminReportComponent from './components/AdminReportComponent.jsx';
import AdminAddProductComponent from './components/AdminAddProductComponent.jsx';
import AdminRoleComponent from './components/AdminRoleComponent.jsx';
import AdminDiscountComponent from './components/AdminDiscountComponent.jsx';
import AdminUpdateProductComponent from './components/AdminUpdateProductComponent.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'; // Trang báo không có quyền

function AppContent() {
  const location = useLocation();
  const noHeaderFooterPaths = ['/admin/error'];
  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <AdminHeader />}
      <Routes>

        <Route element={<ProtectedRoute requiredPermission="SALES_GET" />}>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/index" element={<AdminHomePage />} />
        </Route>
        
        <Route element={<ProtectedRoute requiredPermission="ACCOUNTS_GET" />}>
          <Route path="/admin/account-manager" element={<AdminAccountComponent />} />
          <Route path="/admin/account-role-manager" element={<AdminRoleComponent />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="PRODUCTS_GET" />}>
          <Route path="/admin/product-manager" element={<AdminProductComponent />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="PRODUCTS_POST" />}>
          <Route path="/admin/add-product" element={<AdminAddProductComponent />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="PRODUCTS_PUT" />}>
          <Route path="/admin/edit-product/:id" element={<AdminUpdateProductComponent />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="ORDERS_GET" />}>
          <Route path="/admin/order-manager" element={<AdminOrderComponent />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="SALES_GET" />}>
          <Route path="/admin/discount-manager" element={<AdminDiscountComponent />} />
          <Route path="/admin/report" element={<AdminReportComponent />} />
        </Route>

        <Route path="/admin/error" element={<UnauthorizedPage />} /> {/* Route cho trang không có quyền */}
      </Routes>
      {showHeaderFooter && <AdminFooter />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
