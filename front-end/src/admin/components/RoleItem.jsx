import axios from "axios";
import React from "react";
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from "../service/AdminService";
const RoleItem = ({ role, fetchRoles }) => {
    const token = localStorage.getItem('token');
    const groupPermissionsByCategory = (permissions) => {
        const groupedPermissions = {};

        permissions.forEach((permission) => {
            const [category] = permission.name.split("_");
            if (!groupedPermissions[category]) {
                groupedPermissions[category] = [];
            }
            groupedPermissions[category].push(permission);
        });

        return groupedPermissions;
    };
    const groupedPermissions = groupPermissionsByCategory(role.permissions);

    const handleAddPermission = async () => {
        const permissionsResponse = await axios.get(`${REST_API_BASE_URL}/permissions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const permissions = permissionsResponse.data.result;

        Swal.fire({
            title: 'Thêm quyền truy cập',
            html: `
                <select id="permissionName" class="swal2-select">
                    <option value="">-- Chọn quyền tồn tại --</option>
                    ${permissions.map(permission => `<option value="${permission.name}">${permission.name}</option>`).join('')}
                </select>
            `,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Thêm',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const permissionName = document.getElementById('permissionName').value;
                return axios.post(`${REST_API_BASE_URL}/roles/${role.name}/permissions`, { name: permissionName }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        return response.data;
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thêm quyền truy cập thành công',
                    icon: 'success'
                });
                fetchRoles();
            }
        }
        ).catch((error) => {
            console.error(error);
            Swal.fire({
                title: 'Thêm quyền truy cập thất bại',
                text: `Lỗi: ${error}`,
                icon: 'error'
            });
        });
    };

    const handleDeleteRole = () => {
        Swal.fire({
            title: 'Xác nhận xóa vai trò',
            text: `Bạn có chắc chắn muốn xóa vai trò "${role.description}" không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${REST_API_BASE_URL}/roles/${role.name}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        return response.data;
                    })
                    .then(() => {
                        Swal.fire({
                            title: 'Xóa vai trò thành công',
                            icon: 'success'
                        });
                        fetchRoles();
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Xóa vai trò thất bại',
                            text: `Lỗi: ${error}`,
                            icon: 'error'
                        });
                    });
            }
        });
    };

    const handleDeletePermission = (permissionName) => {
        Swal.fire({
            title: 'Xác nhận xóa quyền truy cập',
            text: `Bạn có chắc chắn muốn xóa quyền truy cập "${permissionName}" không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${REST_API_BASE_URL}/roles/${role.name}/permissions/${permissionName}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error(response.statusText);
                        }
                        return response.data;
                    })
                    .then(() => {
                        Swal.fire({
                            title: 'Xóa quyền truy cập thành công',
                            icon: 'success'
                        });
                        fetchRoles();
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Xóa quyền truy cập thất bại',
                            text: `Lỗi: ${error}`,
                            icon: 'error'
                        });
                    });
            }
        });
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                    <div>
                        <div className="tile-container">
                            <h3 className="tile-title">{role.description}</h3>
                            <a className="btn btn-danger btn-sm" onClick={handleDeleteRole}>
                                <i className="fas fa-trash-alt" /> Xóa vai trò
                            </a>
                        </div>
                    </div>
                    <div className="tile-body">
                        <div className="row element-button">
                            <div className="col-sm-2">
                                <a className="btn btn-add btn-sm" onClick={handleAddPermission}>
                                    <i className="fas fa-plus" /> Thêm quyền truy cập
                                </a>
                            </div>
                        </div>
                        {Object.entries(groupedPermissions).map(([category, permissions]) => (
                            <div key={category}>
                                <h6>{category}</h6>
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Tên quyền</th>
                                            <th>Mô tả</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions.map((permission, idx) => (
                                            <tr key={idx}>
                                                <td style={{ width: '15%' }}>{permission.name}</td>
                                                <td >{permission.description}</td>
                                                <td className="table-td-center" style={{ textAlign: 'center', width: '80px' }}>
                                                    <a onClick={() => handleDeletePermission(permission.name)} className="btn btn-primary btn-sm trash" type="button" title="Xóa">
                                                        <i className="fas fa-trash-alt" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleItem;