import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppTitleComponent from './AppTitleComponent'
import { REST_API_BASE_URL } from '../service/AdminService';
import RevenueChart from '../util/RevenueChart';
import RevenuePieChart from '../util/RevenuePieChart';


const AdminReportComponent = () => {
    const token = localStorage.getItem('token');
    const [totalAccount, setTotalAccount] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [outOfStock, setOutOfStock] = useState([]);
    const [newCustomers, setNewCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cancelledOrdersCount, setCancelledOrdersCount] = useState(0);
    const [topSellingProducts, setTopSellingProducts] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    outOfStockResponse,
                    totalAccountResponse,
                    totalProductResponse,
                    totalOrderResponse,
                    totalAmountResponse,
                    newCustomersResponse,
                    ordersResponse,
                    topSellingProductsResponse
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
                    axios.get(`${REST_API_BASE_URL}/orders/total-amount`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    axios.get(`${REST_API_BASE_URL}/account/new-accounts/5`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }),
                    axios.get(`${REST_API_BASE_URL}/orders/admin-orders`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    }), axios.get(`${REST_API_BASE_URL}/products/top-selling/5`, {
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                ]);

                const sortedOutOfStock = outOfStockResponse.data.result.sort((a, b) => {
                    return a.sizeColorProductsEntity[0].inventoryEntity.quantity - b.sizeColorProductsEntity[0].inventoryEntity.quantity;
                });

                const cancelledOrders = ordersResponse.data.result.filter(order => order.status === "Đã hủy").length;

                setOutOfStock(sortedOutOfStock);
                setTotalAccount(totalAccountResponse.data.result);
                setTotalProduct(totalProductResponse.data.result);
                setTotalOrder(totalOrderResponse.data.result);
                setTotalAmount(totalAmountResponse.data.result);
                setNewCustomers(newCustomersResponse.data.result);
                setOrders(ordersResponse.data.result);
                setCancelledOrdersCount(cancelledOrders);
                setTopSellingProducts(topSellingProductsResponse.data.result);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchData();
    }, []);
    return (
        <main className="app-content">
            <AppTitleComponent />
            <div className="row">
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small primary coloured-icon">
                        <i className="icon  bx bxs-user fa-3x" />
                        <div className="info">
                            <h4>Tổng khách hàng</h4>
                            <p>
                                <b>{totalAccount} nhân viên</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small info coloured-icon">
                        <i className="icon bx bxs-purchase-tag-alt fa-3x" />
                        <div className="info">
                            <h4>Tổng sản phẩm</h4>
                            <p>
                                <b>{totalProduct} sản phẩm</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small warning coloured-icon">
                        <i className="icon fa-3x bx bxs-shopping-bag-alt" />
                        <div className="info">
                            <h4>Tổng đơn hàng</h4>
                            <p>
                                <b>{totalOrder} đơn hàng</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small danger coloured-icon">
                        <i className="icon fa-3x bx bxs-info-circle" />
                        <div className="info">
                            <h4>Bị khóa tài khoản</h4>
                            <p>
                                <b>2 tài khoản</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small primary coloured-icon">
                        <i className="icon fa-3x bx bxs-chart" />
                        <div className="info">
                            <h4>Tổng thu nhập</h4>
                            <p>
                                <b>{parseInt(totalAmount).toLocaleString('it-IT')} đ</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small info coloured-icon">
                        <i className="icon fa-3x bx bxs-user-badge" />
                        <div className="info">
                            <h4>Khách hàng mới</h4>
                            <p>
                                <b>3 khách hàng</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small warning coloured-icon">
                        <i className="icon fa-3x bx bxs-tag-x" />
                        <div className="info">
                            <h4>Sắp Hết hàng</h4>
                            <p>
                                <b>{outOfStock.length} sản phẩm</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="widget-small danger coloured-icon">
                        <i className="icon fa-3x bx bxs-receipt" />
                        <div className="info">
                            <h4>Đơn hàng hủy</h4>
                            <p>
                                <b>{cancelledOrdersCount} đơn hàng</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div>
                            <h3 className="tile-title">SẢN PHẨM BÁN CHẠY</h3>
                        </div>
                        <div className="tile-body">
                            <table className="table table-hover table-bordered responsive-table" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá tiền</th>
                                        <th>Danh mục</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topSellingProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.nameProduct}</td>
                                            <td>{product.sizeColorProductsEntity[0].discountPrice.toLocaleString('it-IT')} đ</td>
                                            <td>{product.categoryEntity.nameCategory}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div>
                            <h3 className="tile-title">SẢN PHẨM SẮP HẾT</h3>
                        </div>
                        <div className="tile-body">
                            <table className="table table-hover table-bordered responsive-table" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Ảnh</th>
                                        <th>Màu sắc/Kích thước</th>
                                        <th>Số lượng</th>
                                        <th>Tình trạng</th>
                                        <th>Giá tiền</th>
                                        <th>Danh mục</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {outOfStock.slice(0, 4).map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.nameProduct}</td>
                                            <td>
                                                <img src={product.imageProductEntity[0].image} alt={product.nameProduct} style={{ width: '50px', height: '50px' }} />
                                            </td>
                                            <td>{product.sizeColorProductsEntity[0].color} / {product.sizeColorProductsEntity[0].size}</td>
                                            <td>{product.sizeColorProductsEntity[0].inventoryEntity.quantity}</td>
                                            <td>{product.sizeColorProductsEntity[0].inventoryEntity.quantity === 0 ? "Hết hàng" : "Còn hàng"}</td>
                                            <td>{product.sizeColorProductsEntity[0].discountPrice.toLocaleString('it-IT')} đ</td>
                                            <td>{product.categoryEntity.nameCategory}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div>
                            <h3 className="tile-title">KHÁCH HÀNG MỚI</h3>
                        </div>
                        <div className="tile-body">
                            <table className="table table-hover table-bordered responsive-table" id="sampleTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Địa chỉ</th>
                                        <th>SĐT</th>
                                        <th>Chức vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newCustomers.map((customer, index) => (
                                        <tr key={index}>
                                            <td>{customer.id}</td>
                                            <td>{customer.accountName}</td>
                                            <td>{new Date(customer.birthday).toLocaleDateString()}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.roles.map(role => role.name).join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-6">
                    <RevenuePieChart />
                </div>
                <div className="col-md-12 col-lg-6">
                    <RevenueChart />
                </div>
            </div>
        </main>
    )
}


export default AdminReportComponent