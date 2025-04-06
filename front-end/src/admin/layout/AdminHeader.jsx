import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

const AdminHeader = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = `/`;
    };

    const handleToggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        const sidebar = document.querySelector('.app-sidebar');
        sidebar.style.display = sidebarVisible ? 'none' : 'block';
    };
    useEffect(() => {
        const { pathname } = location;
        if (pathname === '/admin/index') {
            setActiveMenu('home');
        } else if (pathname === '/admin/account-manager') {
            setActiveMenu('account');
        } else if (pathname === '/admin/product-manager') {
            setActiveMenu('product');
        } else if (pathname === '/admin/discount-manager') {
            setActiveMenu('discount');
        } else if (pathname === '/admin/order-manager') {
            setActiveMenu('order');
        } else if (pathname === '/admin/report') {
            setActiveMenu('report');
        } else {
            setActiveMenu(null);
        }
    }, [location]);
    function getHomePage() {
        navigate('/admin/index')
    }
    function getAccountManager() {
        navigate('/admin/account-manager')
    }
    function getProductManager() {
        navigate('/admin/product-manager')
    }
    function getDiscountManager() {
        navigate('/admin/discount-manager')
    }
    function getOrderManager() {
        navigate('/admin/order-manager')
    }
    function getReport() {
        navigate('/admin/report')
    }

    return (
        <>
            <header className="app-header">
                <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"} onClick={handleToggleSidebar}></a>
                <ul className="app-nav">
                    <li>
                        <a className="app-nav__item" onClick={logout}>
                            <i className="bx bx-log-out bx-rotate-180" />{" "}
                        </a>
                    </li>
                </ul>
            </header>
            <aside className="app-sidebar">
                <div className="app-sidebar__user">
                    <img
                        className="app-sidebar__user-avatar"
                        src="https://moc247.com/wp-content/uploads/2023/12/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"
                        width="50px"
                        alt="User Image" />
                    <div>
                        <p className="app-sidebar__user-name">
                            <b>Lê Minh Long</b>
                        </p>
                        <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
                    </div>
                </div>
                <hr />
                <ul className="app-menu">
                    <li>
                        <a className="app-menu__item haha">
                            <i className="app-menu__icon bx bx-cart-alt" />
                            <span className="app-menu__label">POS Bán Hàng</span>
                        </a>
                    </li>
                    <li>
                        <a className={`app-menu__item ${activeMenu === 'home' ? 'active' : ''}`} onClick={getHomePage}>
                            <i className="app-menu__icon bx bx-tachometer" />
                            <span className="app-menu__label">Bảng điều khiển</span>
                        </a>
                    </li>
                    <li>
                        <a className={`app-menu__item ${activeMenu === 'account' ? 'active' : ''}`} onClick={getAccountManager}>
                            <i className="app-menu__icon bx bx-id-card" />
                            <span className="app-menu__label">Quản lý tài khoản</span>
                        </a>
                    </li>
                    <li>
                        <a className={`app-menu__item ${activeMenu === 'product' ? 'active' : ''}`} onClick={getProductManager}>
                            <i className="app-menu__icon bx bx-purchase-tag-alt" />
                            <span className="app-menu__label">Quản lý sản phẩm</span>
                        </a>
                    </li>
                    <li>
                        <a className={`app-menu__item ${activeMenu === 'discount' ? 'active' : ''}`} onClick={getDiscountManager}>
                            <i className="app-menu__icon bx bxs-discount" />
                            <span className="app-menu__label">Quản lý mã giảm giá</span>
                        </a>
                    </li>
                    <li>
                        <a className={`app-menu__item ${activeMenu === 'order' ? 'active' : ''}`} onClick={getOrderManager}>
                            <i className="app-menu__icon bx bx-task" />
                            <span className="app-menu__label">Quản lý đơn hàng</span>
                        </a>
                    </li>
                    <li>
                        <a className={`app-menu__item ${activeMenu === 'report' ? 'active' : ''}`} onClick={getReport}>
                            <i className="app-menu__icon bx bx-pie-chart-alt-2" />
                            <span className="app-menu__label">Báo cáo doanh thu</span>
                        </a>
                    </li>
                    <li>
                        <a className="app-menu__item" href="#">
                            <i className="app-menu__icon bx bx-cog" />
                            <span className="app-menu__label">Cài đặt hệ thống</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default AdminHeader