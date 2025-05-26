import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import EditModalPromotion from '../util/EditModalPromotion';
import DetailModalPromotion from '../util/DetailModalPromotion';
import CreateModalPromotion from '../util/CreateModalPromotion';

const AdminDiscountComponent = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [discount, setDiscount] = useState(null);
    const [selectedPromotion, setSelectedPromotion] = useState(null);






    const handleCancel = () => {
        setIsModalVisible(false);
        setDiscount(null);
    };

    const handleDetailCancel = () => {
        setIsDetailVisible(false);
        setSelectedPromotion(null);
    };



    const handleCreateCancel = () => {
        setIsCreateModalVisible(false);
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
            title: 'Tên khuyến mãi',
            dataIndex: 'name',
            key: 'name',
            searchable: true,
            sortable: true,
        },
        {
            title: 'Mã giảm giá',
            dataIndex: 'code',
            key: 'code',
            searchable: true,
            sortable: true,
        },
        {
            title: 'Phần trăm giảm',
            dataIndex: 'discountPercentage',
            key: 'discountPercentage',
        },
        {
            title: 'Giảm giá tiền mặt',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => (text ? 'Có thể sử dụng' : 'Không thể sử dụng'),
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        className='btn btn-secondary btn-sm detail'
                        icon={<EyeOutlined />}
                        onClick={() => showDetailModal(record.key)}
                    >
                        Chi tiết
                    </Button>
                    <Button
                        type="primary"
                        className='btn btn-primary btn-sm edit'
                        icon={<EditOutlined />}
                        onClick={() => showModal(record.key)}
                    >
                        Sửa
                    </Button>
                    <Button
                        type="danger"
                        className='btn btn-primary btn-sm trash'
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.key)}
                    >
                        Xóa
                    </Button>

                </Space>
            ),
        },
    ];

    return (
        <main className="app-content">
            <AppTitleComponent name={'Quản lý khyến mãi'} />
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <EmlementButtonComponent />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setIsCreateModalVisible(true)}
                                style={{ marginBottom: '16px' }}
                            >
                                Tạo khuyến mãi mới
                            </Button>
                            <ReusableTableComponent columns={columns} data={data} />
                        </div>
                    </div>
                </div>
                {isModalVisible && discount && (
                    <EditModalPromotion
                        promotion={discount}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                )}
                {isDetailVisible && selectedPromotion && (
                    <DetailModalPromotion
                        promotion={selectedPromotion}
                        onCancel={handleDetailCancel}
                    />
                )}
                {isCreateModalVisible && (
                    <CreateModalPromotion
                        onCancel={handleCreateCancel}
                        onCreate={handleCreate}
                    />
                )}
            </div>
        </main>
    );
}

export default AdminDiscountComponent;
