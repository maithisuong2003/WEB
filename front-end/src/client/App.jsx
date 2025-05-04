import HomePage from './pages/HomePage.jsx'
import Header from './layout/Header.jsx'
import Footer from './layout/Footer.jsx'
import ListProductComponent from './pages/ProductsPage.jsx'
import ProductComponent from './pages/ProductDetailPage.jsx'
import LoginComponent from './pages/LoginPage.jsx'
import RegisterComponent from './pages/RegisterPage.jsx'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import CartPage from './pages/CartPage.jsx'

import '../index.css'
import './assets/css/index.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import './assets/css/product-infor-style.css'
import './assets/css/quickviews-popup-cart.css'
import './assets/css/coupon.css'
import './assets/css/sidebar-style.css'
import './assets/css/product-style.css'
import './assets/css/cartpage.css'
import './assets/css/appcombo.css'
import './assets/css/collection-style.css'
import ProfileComponent from './components/ProfileComponent.jsx'
import OrderHistoryPage from './pages/OrderHistoryPage.jsx'
import IntroductionPage from './pages/IntroductionPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import StoreAddress from './pages/StoreAddress.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import SearchResults from './components/SearchResults.jsx'

// eslint-disable-next-line react/prop-types
function LayoutWrapper({ children }) {
  const location = useLocation()
  const noLayoutRoutes = ['/login', '/register','/forgot-password']
  const hideLayout = noLayoutRoutes.includes(location.pathname)

  return (
      <>
        {!hideLayout && <Header />}
        {children}
        {!hideLayout && <Footer />}
      </>
  )
}

function App() {
  return (
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/products/:category?" element={<ListProductComponent />} />
            <Route path="/product/:id" element={<ProductComponent />} />
            <Route path="/search/:search" element={<SearchResults />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/introduction" element={<IntroductionPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/store-address" element={<StoreAddress />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
  )
}

export default App