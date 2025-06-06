import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { EyeOutlined, CheckOutlined,CloseOutlined } from '@ant-design/icons';

import Swal from 'sweetalert2';
import axios from 'axios';
import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import { REST_API_BASE_URL } from '../service/AdminService';
import DetailModalOrder from '../util/DetailModalOrder';


const AdminOrderComponent = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    useEffect(() => {
        axios.get(`${REST_API_BASE_URL}/orders/admin-orders`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.code === 200) {
                    if (response.data.result.length > 0) {
                        setData(response.data.result.map(item => ({
                            key: item.id.toString(),
                            id: item.id,
                            accountName: item.accountEntity.fullName,
                            orderItems: item.orderItems,
                            quantity: item.orderItems.map(orderItem => orderItem.quantity).join(', '),
                            totalPrice: item.totalPrice,
                            status: item.status,
                            sizeColor: item.orderItems.map(orderItem => `${orderItem.productSize}/${orderItem.productColor}`).join(", "),
                        })));
                    }
                }
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, [token]);

    const handleUpdateStatus = (id, status) => {
        let confirmText = '';
        let successText = '';
        if (status === 'Đã duyệt') {
            confirmText = 'Bạn muốn duyệt đơn hàng này?';
            successText = 'Đơn hàng đã được duyệt!';
        } else if (status === 'Vận chuyển') {
            confirmText = 'Bạn muốn chuyển đơn hàng này?';
            successText = 'Đơn hàng đang được vận chuyển!';
        } else if (status === 'Hoàn thành') {
            confirmText = 'Bạn muốn hoàn thành đơn hàng này?';
            successText = 'Đơn hàng đã hoàn thành!';
        }

        Swal.fire({
            title: confirmText,
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`${REST_API_BASE_URL}/orders/update-status/${id}`, { status }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.data.code === 200) {
                            Swal.fire('Thành công!', successText, 'success');
                            setData(data.map(item => {
                                if (item.id === id) {
                                    return { ...item, status };
                                }
                                return item;
                            }));
                        } else {
                            Swal.fire('Lỗi!', 'Không thể thay đổi trạng thái đơn hàng.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error("There was an error!", error);
                        Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi thay đổi trạng thái đơn hàng.', 'error');
                    });
            }
        });
    };





    const showDetailModal = async (id) => {
        try {
            const response = await axios.get(`${REST_API_BASE_URL}/orders/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.data.code === 200) {
                setSelectedOrder(response.data.result);
                setIsDetailVisible(true);
            } else {
                Swal.fire('Lỗi!', 'Không thể lấy thông tin đơn hàng.', 'error');
            }

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    const handleDetailCancel = () => {
        setSelectedOrder(null);
        setIsDetailVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            searchable: true,
            sortable: true,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'accountName',
            key: 'accountName',
            searchable: true,
            sortable: true,
        },
        {
            title: 'Đơn hàng',
            dataIndex: 'orderItems',
            key: 'orderItems',
            render: orderItems => (
                <div>
                    {orderItems.map((item, index) => (
                        <div key={index}>{item.productEntity.nameProduct}</div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Màu sắc/Kích thước',
            dataIndex: 'sizeColor',
            key: 'sizeColor',
            render: (text) => (
                <div>{text.split(', ').map((sizeColor, index) => (
                    <div key={index}>{sizeColor}</div>
                ))}</div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => (
                <div>{text.split(', ').map((sizeColor, index) => (
                    <div key={index}>{sizeColor}</div>
                ))}</div>
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => (
                <div>{parseInt(text).toLocaleString('it-IT')}đ</div>
            ),
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',

            render: (text) => {
                let className = 'badge ';
                if (text === 'Đã duyệt') {
                    className += 'bg-primary';
                } else if (text === 'Vận chuyển') {
                    className += 'bg-warning';
                } else if (text === 'Hoàn thành') {
                    className += 'bg-success';
                } else {
                    className += 'bg-secondary';
                }
                return <span className={className}>{text}</span>;
            },
        },

        {
            title: 'Tính năng',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {
                        record.status === 'Đã duyệt' ? (
                            <Button
                                type="default"
                                className='btn btn-info btn-sm'
                                icon={<CheckOutlined />}
                                onClick={() => handleUpdateStatus(record.id, 'Vận chuyển')}
                            >
                                Vận chuyển
                            </Button>
                        ) : record.status === 'Đã hủy' ? (
                            <Button
                                type="default"
                                className='btn btn-danger btn-sm'
                                icon={<CloseOutlined />}
                                disabled
                            >
                                Đã hủy
                            </Button>
                        ) : record.status === 'Vận chuyển' ? (
                            <Button
                                type="default"
                                className='btn btn-warning btn-sm'
                                icon={<CheckOutlined />}
                                onClick={() => handleUpdateStatus(record.id, 'Hoàn thành')}
                            >
                                Hoàn thành
                            </Button>
                        ) : record.status === 'Hoàn thành' ? (
                            <Button
                                type="default"
                                className='btn btn-success btn-sm'
                                icon={<CheckOutlined />}
                                disabled
                            >
                                Đã hoàn thành
                            </Button>
                        ) : (
                            <Button
                                type="default"
                                className='btn btn-primary btn-sm'
                                icon={<CheckOutlined />}
                                onClick={() => handleUpdateStatus(record.id, 'Đã duyệt')}
                            >
                                Duyệt
                            </Button>
                        )
                    }

                    <Button
                        type="default"
                        className='btn btn-secondary btn-sm detail'
                        icon={<EyeOutlined />}
                        onClick={() => showDetailModal(record.key)}
                    >
                        Chi tiết
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <main className="app-content">
            <AppTitleComponent name={'Quản lý đơn hàng'} />
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <EmlementButtonComponent />
                            <ReusableTableComponent columns={columns} data={data} />
                            <DetailModalOrder
                                order={selectedOrder}
                                visible={isDetailVisible}
                                onCancel={handleDetailCancel}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminOrderComponent;