import React, { useEffect, useState } from "react";
import AppTitleComponent from "./AppTitleComponent";
import axios from "axios";
import Swal from 'sweetalert2';
import RoleItem from "./RoleItem";
import { REST_API_BASE_URL } from "../service/AdminService";

const AdminRoleComponent = () => {
    const [roles, setRoles] = useState([]);
    const token = localStorage.getItem('token');
    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${REST_API_BASE_URL}/roles`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setRoles(response.data.result);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };
    useEffect(() => {
        fetchRoles();
    }, []);
    const handleAddRole = () => {
        Swal.fire({
            title: 'Nhập thông tin vai trò mới',
            html: `
                <input id="roleName" class="swal2-input" placeholder="Tên vai trò">
                <input id="roleDescription" class="swal2-input" placeholder="Mô tả vai trò">
            `,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Thêm',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const roleName = document.getElementById('roleName').value.toUpperCase();
                const roleDescription = document.getElementById('roleDescription').value;
                return axios.post(`${REST_API_BASE_URL}/roles`, { name: roleName, description: roleDescription }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log(response);
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
                    title: 'Thêm vai trò thành công',
                    icon: 'success'
                });
                fetchRoles();
            }
        });
    };

    return (
        <main className="app-content">
            <AppTitleComponent />
            <button style={{ marginBottom: 10, marginLeft: 10 }} className="btn btn-add btn-sm" onClick={handleAddRole}>
                <i className="fas fa-plus" />
                Thêm vai trò
            </button>
            {roles.map((role, index) => (
                <RoleItem key={index} role={role} fetchRoles={fetchRoles} />
            ))}
        </main>
    );
};

export default AdminRoleComponent;
