import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { EyeOutlined, CheckOutlined,CloseOutlined } from '@ant-design/icons';


import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import DetailModalOrder from '../util/DetailModalOrder';


const AdminOrderComponent = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

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
