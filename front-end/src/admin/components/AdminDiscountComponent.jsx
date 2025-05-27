import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import EditModalPromotion from '../util/EditModalPromotion';
import DetailModalPromotion from '../util/DetailModalPromotion';
import CreateModalPromotion from '../util/CreateModalPromotion';
import { REST_API_BASE_URL } from '../service/AdminService';

const AdminDiscountComponent = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [discount, setDiscount] = useState(null);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get(`${REST_API_BASE_URL}/promotion/all`)
            .then(response => {
                if (response.data.code === 200 && response.data.result.length > 0) {
                    setData(response.data.result.map(item => ({
                        key: item.id.toString(), // Ensure key is a string
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        discountPercentage: item.percentageDiscount,
                        discountAmount: item.fixedDiscount,
                        startDate: item.startTime ? new Date(item.startTime).toLocaleDateString() : '',
                        endDate: item.endTime ? new Date(item.endTime).toLocaleDateString() : '',
                        isActive: item.status === 1,
                    })));
                }
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleDelete = (key) => {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn sẽ không thể khôi phục điều này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xóa nó đi!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${REST_API_BASE_URL}/promotion/delete/${key}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(() => {
                        setData(data.filter(item => item.key !== key));
                        Swal.fire('Đã xóa!', 'Khuyến mãi đã bị xóa.', 'success');
                    })
                    .catch(error => {
                        console.error("There was an error deleting the discount!", error);
                        Swal.fire('Lỗi!', 'Không thể xóa khuyến mãi.', 'error');
                    });
            }
        });
    };

    const showModal = async (id) => {
        try {
            const response = await axios.get(`${REST_API_BASE_URL}/promotion/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.data.code === 200) {
                setDiscount(response.data.result);
                setIsModalVisible(true);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const showDetailModal = async (id) => {
        try {
            const response = await axios.get(`${REST_API_BASE_URL}/promotion/${id}`)
            if (response.data.code === 200) {
                setSelectedPromotion(response.data.result);
                setIsDetailVisible(true);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setDiscount(null);
    };

    const handleDetailCancel = () => {
        setIsDetailVisible(false);
        setSelectedPromotion(null);
    };

    const handleSave = async (updatedDiscount) => {
        try {
            const response = await axios.put(`${REST_API_BASE_URL}/promotion/edit/${updatedDiscount.id}`, updatedDiscount, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.data.code === 200) {
                setData(data.map(item => (item.id === updatedDiscount.id ? {
                    key: updatedDiscount.id,
                    id: updatedDiscount.id,
                    name: updatedDiscount.name,
                    code: updatedDiscount.code,
                    discountPercentage: updatedDiscount.percentageDiscount,
                    discountAmount: updatedDiscount.fixedDiscount,
                    startDate: updatedDiscount.startTime ? new Date(updatedDiscount.startTime).toLocaleDateString() : '',
                    endDate: updatedDiscount.endTime ? new Date(updatedDiscount.endTime).toLocaleDateString() : '',
                    isActive: updatedDiscount.status === 1,
                } : item)));
                setIsModalVisible(false);
                Swal.fire('Thành công!', 'Khuyến mãi đã được cập nhật.', 'success');
            } else {
                console.error('Failed to update discount');
                Swal.fire('Lỗi!', 'Không thể cập nhật khuyến mãi.', 'error');
            }
        } catch (error) {
            console.error('Error updating discount', error);
            Swal.fire('Lỗi!', 'Không thể cập nhật khuyến mãi.', 'error');
        }
    };
    const handleCreate = async (newPromotion) => {
        try {
            const response = await axios.post(`${REST_API_BASE_URL}/promotion/create`, newPromotion, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log('API Response:', response.data); // Log the response

            if (response.data.code === 200) {
                setData([...data, {
                    key: response.data.result.id, // Ensure key is a string
                    id: response.data.result.id,
                    name: response.data.result.name,
                    code: response.data.result.code,
                    discountPercentage: response.data.result.percentageDiscount,
                    discountAmount: response.data.result.fixedDiscount,
                    startDate: response.data.result.startTime ? new Date(response.data.result.startTime).toLocaleDateString() : '',
                    endDate: response.data.result.endTime ? new Date(response.data.result.endTime).toLocaleDateString() : '',
                    isActive: response.data.result.status === 1,
                }]);
                setIsCreateModalVisible(false);
                Swal.fire('Thành công!', 'Khuyến mãi mới đã được tạo.', 'success');
            } else {
                console.error('Failed to create discount');
                Swal.fire('Lỗi!', 'Không thể tạo khuyến mãi.', 'error');
            }
        } catch (error) {
            console.error('Error creating discount', error);
            Swal.fire('Lỗi!', 'Không thể tạo khuyến mãi.', 'error');
        }
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
