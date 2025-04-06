import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditModalPromotion = ({ promotion, onCancel, onSave }) => {
  const [updatedPromotion, setUpdatedPromotion] = useState({
    key: promotion.id,
    id: promotion.id,
    name: promotion.name,
    description: promotion.description,
    code: promotion.code,
    percentageDiscount: promotion.percentageDiscount,
    fixedDiscount: promotion.fixedDiscount,
    quantity: promotion.quantity,
    startTime: promotion.startTime.split('T')[0],
    endTime: promotion.endTime.split('T')[0],
    status: promotion.status,
    applicableCondition: promotion.applicableCondition,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedPromotion);
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
                  <h5>Chỉnh sửa khuyến mãi</h5>
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
                  value={updatedPromotion.id}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Tên khuyến mãi</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={updatedPromotion.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mô tả</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={updatedPromotion.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mã giảm giá</label>
                <input
                  className="form-control"
                  type="text"
                  name="code"
                  value={updatedPromotion.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Phần trăm giảm</label>
                <input
                  className="form-control"
                  type="number"
                  name="percentageDiscount"
                  value={updatedPromotion.percentageDiscount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Giảm giá tiền mặt</label>
                <input
                  className="form-control"
                  type="number"
                  name="fixedDiscount"
                  value={updatedPromotion.fixedDiscount || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Số lượng</label>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  value={updatedPromotion.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày bắt đầu</label>
                <input
                  className="form-control"
                  type="date"
                  name="startTime"
                  value={updatedPromotion.startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày kết thúc</label>
                <input
                  className="form-control"
                  type="date"
                  name="endTime"
                  value={updatedPromotion.endTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Trạng thái</label>
                <select
                  className="form-control"
                  name="status"
                  value={updatedPromotion.status}
                  onChange={handleInputChange}
                >
                  <option value={1}>Có thể sử dụng</option>
                  <option value={0}>Không thể sử dụng</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Điều kiện áp dụng</label>
                <input
                  className="form-control"
                  type="text"
                  name="applicableCondition"
                  value={updatedPromotion.applicableCondition}
                  onChange={handleInputChange}
                />
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

export default EditModalPromotion;
