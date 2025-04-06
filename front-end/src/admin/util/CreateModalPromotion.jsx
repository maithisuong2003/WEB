import React, { useState } from 'react';

const CreateModalPromotion = ({ onCancel, onCreate }) => {
  const [newPromotion, setNewPromotion] = useState({
    name: '',
    description: '',
    code: '',
    percentageDiscount: 0,
    fixedDiscount: 0,
    quantity: 0,
    startTime: '',
    endTime: '',
    status: 1,
    applicableCondition: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    onCreate(newPromotion);
  };

  return (
    <div
      className="modal fade show"
      id="ModalCreate"
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
                  <h5>Tạo khuyến mãi mới</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="control-label">Tên khuyến mãi</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={newPromotion.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mô tả</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={newPromotion.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mã giảm giá</label>
                <input
                  className="form-control"
                  type="text"
                  name="code"
                  value={newPromotion.code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Phần trăm giảm</label>
                <input
                  className="form-control"
                  type="number"
                  name="percentageDiscount"
                  value={newPromotion.percentageDiscount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Giảm giá tiền mặt</label>
                <input
                  className="form-control"
                  type="number"
                  name="fixedDiscount"
                  value={newPromotion.fixedDiscount || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Số lượng</label>
                <input
                  className="form-control"
                  type="number"
                  name="quantity"
                  value={newPromotion.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày bắt đầu</label>
                <input
                  className="form-control"
                  type="date"
                  name="startTime"
                  value={newPromotion.startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày kết thúc</label>
                <input
                  className="form-control"
                  type="date"
                  name="endTime"
                  value={newPromotion.endTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Trạng thái</label>
                <select
                  className="form-control"
                  name="status"
                  value={newPromotion.status}
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
                  value={newPromotion.applicableCondition}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <a className="btn btn-save" type="button" onClick={handleCreate}>
              Tạo mới
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

export default CreateModalPromotion;
