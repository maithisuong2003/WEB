import React from 'react';

const DetailModalPromotion = ({ promotion, onCancel }) => {
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
                  <h5>Chi tiết khuyến mãi</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="control-label">ID</label>
                <input
                  className="form-control"
                  type="text"
                  value={promotion.id}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Tên khuyến mãi</label>
                <input
                  className="form-control"
                  type="text"
                  value={promotion.name}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mô tả</label>
                <input
                  className="form-control"
                  type="text"
                  value={promotion.description}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mã giảm giá</label>
                <input
                  className="form-control"
                  type="text"
                  value={promotion.code}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Phần trăm giảm</label>
                <input
                  className="form-control"
                  type="number"
                  value={promotion.percentageDiscount}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Giảm giá tiền mặt</label>
                <input
                  className="form-control"
                  type="number"
                  value={promotion.fixedDiscount || ''}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Số lượng</label>
                <input
                  className="form-control"
                  type="number"
                  value={promotion.quantity}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày bắt đầu</label>
                <input
                  className="form-control"
                  type="date"
                  value={promotion.startTime.split('T')[0]}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Ngày kết thúc</label>
                <input
                  className="form-control"
                  type="date"
                  value={promotion.endTime.split('T')[0]}
                  disabled
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Trạng thái</label>
                <select
                  className="form-control"
                  value={promotion.status}
                  disabled
                  readOnly
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
                  value={promotion.applicableCondition}
                  disabled
                  readOnly
                />
              </div>
            </div>
            <a style={{ marginLeft: '10px' }} className="btn btn-cancel" onClick={onCancel}>
              Đóng
            </a>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModalPromotion;
