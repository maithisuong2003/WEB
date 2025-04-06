import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REST_API_BASE_URL } from '../service/AdminService';

const EditModal = ({ account, onCancel, onSave }) => {
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem('token');
  const [selectedRoles, setSelectedRoles] = useState([account.roles[0]?.name] || []);
  const [updatedAccount, setUpdatedAccount] = useState({
    key: account.id,
    id: account.id,
    accountName: account.accountName,
    fullName: account.fullName,
    phone: account.phone,
    email: account.email,
    birthday: account.birthday.split('T')[0],
    address: account.address,
    isActive: account.isActive,
    roles: account.roles.map(role => role.name),
  });

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${REST_API_BASE_URL}/roles`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
      if (response.data.code === 0) {
        setRoles(response.data.result);
      } else {
        console.error('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRoleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedRoles(selectedOptions);
    setUpdatedAccount((prev) => ({
      ...prev,
      roles: selectedOptions
    }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(updatedAccount);
  };

  return (
    <div
      className="modal fade show"
      id="ModalUP"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      style={{ display: 'block' }}
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="form-group col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Chỉnh sửa tài khoản</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="control-label">ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="id"
                  value={updatedAccount.id}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Tên tài khoản</label>
                <input
                  className="form-control"
                  type="text"
                  name="accountName"
                  value={updatedAccount.accountName}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Họ và tên</label>
                <input
                  className="form-control"
                  type="text"
                  name="fullName"
                  value={updatedAccount.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Số điện thoại</label>
                <input
                  className="form-control"
                  type="number"
                  name="phone"
                  maxLength={10} 
                  value={updatedAccount.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Địa chỉ email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  value={updatedAccount.email}
                  disabled
                  readOnly />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày sinh</label>
                <input
                  className="form-control"
                  type="date"
                  name="birthday"
                  value={updatedAccount.birthday}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Địa chỉ</label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={updatedAccount.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Trạng thái hoạt động</label>
                <select
                  className="form-control"
                  name="isActive"
                  value={updatedAccount.isActive}
                  onChange={handleInputChange}
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </select>
              </div>

              <div className="form-group col-md-6">
                <label className="control-label">Quyền người dùng</label>
                <select className="form-control" value={selectedRoles} onChange={handleRoleChange} multiple>
                  {roles.map((role, index) => (
                    <option key={index} value={role.name}>
                      {role.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <a className="btn btn-save" type="button" onClick={handleSave}>
              Lưu lại
            </a>
            <a style={{ marginLeft: '10px' }} className="btn btn-cancel" onClick={onCancel}>
              Hủy bỏ
            </a>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
