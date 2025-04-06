import React from 'react';

const DetailModalOrder = ({ order, onCancel }) => {
    if (!order) {
        return null; // or a loading spinner if you prefer
      }
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
              <div className="col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Chi tiết đơn hàng</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p><strong>ID:</strong> {order.id}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Ngày tạo:</strong> {order.createAt.split('T')[0]}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Ngày giao hàng:</strong> {order.deliveryAt.split('T')[0]}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Địa chỉ:</strong> {order.address}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Tổng giá:</strong> {order.totalPrice.toLocaleString()} VND</p>
              </div>
              <div className="col-md-6">
                <p><strong>Trạng thái:</strong> {order.status}</p>
              </div>
              <div className="col-md-12">
                <p><strong>Ghi chú:</strong> {order.note}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h6>Chi tiết sản phẩm</h6>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="order-item-detail mb-3">
                    <p><strong>Tên sản phẩm:</strong> {item.productEntity.nameProduct}</p>
                    <p><strong>Kích thước:</strong> {item.productSize}</p>
                    <p><strong>Màu sắc:</strong> {item.productColor}</p>
                    <p><strong>Số lượng:</strong> {item.quantity}</p>
                    <p><strong>Giá:</strong> {item.price.toLocaleString()} VND</p>
                    <div className="product-images">
                      {item.productEntity.imageProductEntity.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img.image}
                          alt={item.productEntity.nameProduct}
                          style={{ width: '50px', marginRight: '5px' }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-cancel" onClick={onCancel}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModalOrder;
