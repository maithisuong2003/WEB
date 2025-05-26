import React, { useEffect, useState } from 'react';
import AppTitleComponent from './AppTitleComponent'
import RevenueChart from '../util/RevenueChart';
import RevenuePieChart from '../util/RevenuePieChart';


const AdminReportComponent = () => {
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