import React, { useEffect, useState } from 'react';
import OrderChart from '../util/OrderChart'
import RevenueChart from '../util/RevenueChart'
import axios from 'axios'
import { REST_API_BASE_URL } from '../service/AdminService';
import RevenuePieChart from '../util/RevenuePieChart';
const AdminHomePage = () => {
    const token = localStorage.getItem('token');
    const [totalAccount, setTotalAccount] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [outOfStock, setOutOfStock] = useState([]);
    const [newCustomers, setNewCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    outOfStockResponse,
                    totalAccountResponse,
                    totalProductResponse,
                    totalOrderResponse,
                    newCustomersResponse
                ] = await Promise.all([
                    axios.get(`${REST_API_BASE_URL}/products/out-of-stock/4`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    axios.get(`${REST_API_BASE_URL}/account/total`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    axios.get(`${REST_API_BASE_URL}/products/total`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    axios.get(`${REST_API_BASE_URL}/orders/total`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    axios.get(`${REST_API_BASE_URL}/account/new-accounts/5`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                ]);

                const sortedOutOfStock = outOfStockResponse.data.result.sort((a, b) => {
                    return a.sizeColorProductsEntity[0].inventoryEntity.quantity - b.sizeColorProductsEntity[0].inventoryEntity.quantity;
                });

                setOutOfStock(sortedOutOfStock);
                    setTotalAccount(totalAccountResponse.data.result);
                setTotalProduct(totalProductResponse.data.result);
                setTotalOrder(totalOrderResponse.data.result);
                setNewCustomers(newCustomersResponse.data.result);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="app-content">
            <div className="row">
                <div className="col-md-12">
                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">
                                    <b>Bảng điều khiển</b>
                                </a>
                            </li>
                        </ul>
                        <div id="clock" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="widget-small primary coloured-icon">
                                <i className="icon bx bxs-user-account fa-3x" />
                                <div className="info">
                                    <h4>Tổng khách hàng</h4>
                                    <p>
                                        <b>{totalAccount} khách hàng</b>
                                    </p>
                                    <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="widget-small info coloured-icon">
                                <i className="icon bx bxs-data fa-3x" />
                                <div className="info">
                                    <h4>Tổng sản phẩm</h4>
                                    <p>
                                        <b>{totalProduct} sản phẩm</b>
                                    </p>
                                    <p className="info-tong">Tổng số sản phẩm được quản lý.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="widget-small warning coloured-icon">
                                <i className="icon bx bxs-shopping-bags fa-3x" />
                                <div className="info">
                                    <h4>Tổng đơn hàng</h4>
                                    <p>
                                        <b>{totalOrder} đơn hàng</b>
                                    </p>
                                    <p className="info-tong">Tổng số hóa đơn bán hàng trong tháng.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="widget-small danger coloured-icon">
                                <i className="icon bx bxs-error-alt fa-3x" />
                                <div className="info">
                                    <h4>Sắp hết hàng</h4>
                                    <p>
                                        <b>{outOfStock.length} sản phẩm</b>
                                    </p>
                                    <p className="info-tong">
                                        Số sản phẩm cảnh báo hết cần nhập thêm.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Sản phẩm sắp hết hàng</h3>
                                <div>
                                    <table className="table table-bordered responsive-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Màu sắc/Kích thước</th>
                                                <th>Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                outOfStock.slice(0, 4).map(product => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.nameProduct}</td>
                                                        <td>{product.sizeColorProductsEntity[0].color}/{product.sizeColorProductsEntity[0].size}</td>
                                                        <td>{product.sizeColorProductsEntity[0].inventoryEntity.quantity}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Khách hàng mới</h3>
                                <div>
                                    <table className="table table-hover responsive-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên khách hàng</th>
                                                <th>Ngày sinh</th>
                                                <th>Số điện thoại</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                newCustomers.map(customer => (
                                                    <tr key={customer.id}>
                                                        <td>{customer.id}</td>
                                                        <td>{customer.fullName}</td>
                                                        <td>{new Date(customer.birthday).toLocaleDateString()}</td>
                                                        <td>{customer.phone}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <OrderChart />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <RevenueChart />
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <RevenuePieChart />
                        </div>

                    </div>
                </div>
            </div>
        </main>

    )
}

export default AdminHomePage