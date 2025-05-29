
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useAuth } from '../context/AuthContext.jsx';
import { REST_API_BASE_URL } from '../services/ProductService.js';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [displayCount, setDisplayCount] = useState(2);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        refresh();

    }, [token, user, navigate]);

    const refresh = () => {

        axios.get(`${REST_API_BASE_URL}/orders/my-orders`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                setOrders(response.data.result.reverse() || []);
            })
            .catch(error => {
                console.error("There was an error with the Axios operation:", error);
            });
    }

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 2);
    };

    const handleCancelOrder = (orderId) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${REST_API_BASE_URL}/orders/cancel/${orderId}`, {}, {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                    .then(response => {
                        if (response.data.code === 200) {
                            setOrders(orders.filter(order => order.id !== orderId));
                            Swal.fire('Đã hủy đơn hàng thành công!', '', 'success');
                            refresh();
                        }
                    })
                    .catch(error => {
                        console.error("There was an error with the Axios operation:", error);
                    });
            }
        });
    }

    return (
        <section className="main-order-history-page main-container col1-layout mobile-tab active" id="order-history-tab" data-title="Lịch sử đơn hàng">
            <div className="wrap_background_aside padding-top-15 margin-bottom-40 padding-left-0 padding-right-0 order-history-mbstyle">
                <div className="order-history-mobile container card border-0 py-2">
                    {orders.length > 0 ? (
                        <div className="order-history-content">
                            <div className="header-order-history">
                                <div className="title_order_history heading-bar">
                                    <h1 className="heading-bar__title">Lịch sử đơn hàng</h1>
                                </div>
                            </div>
                            {orders.slice(0, displayCount).map((order, index) => (
                                <div key={index} className="order-item mb-4 p-3 border rounded">
                                    <div className="order-summary mb-2">
                                        <div className="order-id"><strong>Mã đơn hàng:</strong> {order.id}</div>
                                        <div className="order-date"><strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                                        <div className="order-status"><strong>Trạng thái:</strong> {order.status}</div>
                                        <div className="order-payment"><strong>Địa chỉ nhận hàng:</strong> {order.address}</div>
                                    </div>
                                    <div className="order-items">
                                        {order.orderItems && order.orderItems.length > 0 ? (
                                            <div className="order-items-list">
                                                {order.orderItems.map((item, itemIndex) => (
                                                    <React.Fragment key={itemIndex}>
                                                        <a onClick={() => navigate(`/product/${item.productEntity.id}`)} className="d-block mb-2">
                                                            <div className="d-flex align-items-center">
                                                                <img src={item.productEntity.imageProductEntity[0].image} alt={item.productEntity.nameProduct} className="img-thumbnail" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                                <div className="ml-3">
                                                                    <strong className="mb-1">{item.productEntity.nameProduct}</strong>
                                                                    <p className="mb-0">Size: {item.productSize} / Color: {item.productColor}</p>
                                                                    <p className="mb-0">Số lượng: {item.quantity}</p>
                                                                    <p className="mb-0">Giá: {parseInt(item.price).toLocaleString('it-IT')}₫</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        {itemIndex < order.orderItems.length - 1 && <hr />}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="order-total"><strong>Tổng cộng:</strong> {parseInt(order.totalPrice).toLocaleString('it-IT')}₫</div>
                                    {order.status === 'Chờ xác nhận' && (
                                        <div className="order-action text-right">
                                            <button style={{ color: 'red' }} className="btn btn_base" onClick={() => handleCancelOrder(`${order.id}`)}>Hủy đơn hàng</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {displayCount < orders.length && (
                                <div className="text-center mt-4">
                                    <button className="btn btn_base buynow" onClick={handleLoadMore}>Tải thêm</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="order-history-empty container card border-0 py-2 ">
                            <div className="alert green-alert section" role="alert">
                                <div className="title-order-history text-center">
                                    <h1 className="d-none">Lịch sử đơn hàng</h1>
                                    <div>
                                        <img src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/cart_empty_background.png?1704435927037" className="img-fluid" width="298" height="152" />
                                    </div>
                                    <h3>"Hổng” có đơn hàng nào</h3>
                                    <p>Quay về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
                                    <a onClick={() => navigate('/')} title="Mua sắm ngay" className="btn btn-main">Mua sắm ngay</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OrderHistoryPage;