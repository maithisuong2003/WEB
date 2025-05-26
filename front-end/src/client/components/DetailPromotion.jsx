import React from 'react';

const DetailPromotion = ({ promotion, onCancel }) => {
    if (!promotion) return null;

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
                <div className="modal-content" style={{ borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ backgroundColor: "#0074bf", display: "flex", alignItems: "center", padding: "10px 15px" }}>
                        <div style={{ backgroundColor: "#fff", borderRadius: "50%", padding: "8px", marginRight: "10px" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Choice" style={{ width: "24px", height: "24px" }} />
                        </div>
                        <div style={{color: "#fff"}}>
                            <div style={{fontWeight: "bold", fontSize: "16px"}}>Giảm {promotion.percentageDiscount}%
                            </div>
                            <div style={{fontSize: "14px"}}>{promotion.applicableCondition}</div>

                            <div style={{fontSize: "12px"}}>HSD: {promotion.endTime?.split('T')[0]}</div>
                        </div>
                    </div>

                    <div className="modal-body" style={{ padding: "16px", fontSize: "14px", color: "#333" }}>
                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Thời gian sử dụng mã</div>
                            <div>{promotion.startTime?.split('T')[0]} 00:00 - {promotion.endTime?.split('T')[0]} 23:59</div>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Ưu đãi</div>
                            <div>
                                Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Giảm {promotion.percentageDiscount}% {promotion.applicableCondition}
                            </div>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>Áp dụng cho sản phẩm</div>
                            <div>
                                Chỉ áp dụng trên App cho một số sản phẩm và một số người dùng tham gia chương trình khuyến mãi nhất định.
                                <ul>
                                    <li style={{ marginTop: "4px" }}>
                                        Trong các sản phẩm đã chọn có một số sản phẩm không được chạy khuyến mãi theo quy định của pháp luật hoặc đây là sản phẩm độc quyền dành cho thành viên.
                                        <a href="#" style={{ color: "#1a73e8", textDecoration: "none", marginLeft: "5px" }}>Tìm hiểu thêm</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: "bold" }}>Thanh Toán</div>
                            <div>Tất cả các hình thức thanh toán</div>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: "bold" }}>Đơn vị vận chuyển</div>
                            <div>Choice VN</div>
                        </div>

                        <div style={{ marginBottom: "12px" }}>
                            <div style={{ fontWeight: "bold" }}>Thiết bị</div>
                            <div>iOS, Android</div>
                        </div>

                        <div className="text-right">
                            <button className="btn btn-secondary" onClick={onCancel}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPromotion;
