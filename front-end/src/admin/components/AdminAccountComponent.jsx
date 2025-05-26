import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import EditModal from '../util/EditModal';


const AdminAccountComponent = () => {
    const navigate = useNavigate()
    function getRoleManagement() {
        navigate('/admin/account-role-manager')
    }


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
            title: 'Tên đăng nhập',
            dataIndex: 'accountName',
            key: 'accountName',
            searchable: true,
            sortable: true,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            searchable: true,
            sortable: true,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => (text === 'true' ? 'Hoạt động' : 'Không hoạt động'),
        },
        {
            title: 'Chức vụ',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles) => roles.map(role => role).join(', '),
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
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
            <AppTitleComponent name={'Quản lý tài khoản'} />
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <EmlementButtonComponent />
                            <Button
                                type="primary"
                                onClick={getRoleManagement}
                                style={{ marginBottom: 16 }}
                            >
                                Quản lý quyền tài khoản
                            </Button>
                            <ReusableTableComponent columns={columns} data={data} />
                        </div>
                    </div>
                </div>
                {isModalVisible && account && (
                    <EditModal
                        account={account}
                        onCancel={handleCancel}
                        onSave={handleSave}
                    />
                )}
            </div>
        </main>
    )
}

export default AdminAccountComponent