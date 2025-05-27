import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import ReusableTableComponent from './ReusableTableComponent';
import EmlementButtonComponent from './EmlementButtonComponent';
import AppTitleComponent from './AppTitleComponent';
import EditModal from '../util/EditModal';
import { REST_API_BASE_URL } from '../service/AdminService';


const AdminAccountComponent = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [account, setAccount] = useState(null);
    function getRoleManagement() {
        navigate('/admin/account-role-manager')
    }

    useEffect(() => {
        axios.get(`${REST_API_BASE_URL}/account/all`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.code === 200 && response.data.result.length > 0) {
                    setData(response.data.result.map(item => ({
                        key: item.id,
                        id: item.id,
                        fullName: item.fullName,
                        accountName: item.accountName,
                        birthday: item.birthday,
                        address: item.address,
                        email: item.email,
                        phone: item.phone,
                        isActive: item.isActive,
                        createAt: item.createAt,
                        updateAt: item.updateAt,
                        roles: item.roles.map(role => role.name),
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
                axios.delete(`${REST_API_BASE_URL}/account/${key}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(() => {
                        setData(data.filter(item => item.key !== key));
                        Swal.fire('Đã xóa!', 'Tài khoản đã bị xóa.', 'success');
                    })
                    .catch(error => {
                        console.error("There was an error deleting the account!", error);
                        Swal.fire('Lỗi!', 'Không thể xóa tài khoản.', 'error');
                    });
            }
        });
    };

    const showModal = async (id) => {
        try {
            const response = await axios.get(`${REST_API_BASE_URL}/account/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.data.code === 200) {
                setAccount(response.data.result);
                setIsModalVisible(true);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setAccount(null);
    };

    const handleSave = async (updatedAccount) => {
        console.log(updatedAccount);
        try {
            const response = await axios.put(`${REST_API_BASE_URL}/account/edit/${updatedAccount.id}`, updatedAccount, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.data.code === 200) {
                setData(data.map(item => (item.id === updatedAccount.id ? updatedAccount : item)));
                setIsModalVisible(false);
                Swal.fire('Thành công!', 'Tài khoản đã được cập nhật.', 'success');
            } else {
                console.error('Failed to update account');
                Swal.fire('Lỗi!', 'Không thể cập nhật tài khoản.', 'error');
            }
        } catch (error) {
            console.error('Error updating account', error);
            Swal.fire('Lỗi!', 'Không thể cập nhật tài khoản.', 'error');
        }
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