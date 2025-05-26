import React, { useEffect, useState } from 'react';
import axios from "axios";
import { REST_API_BASE_URL } from "../../admin/service/AdminService.js";
import DetailPromotion from './DetailPromotion';

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [savedPromotionIds, setSavedPromotionIds] = useState(new Set());
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const accountId = localStorage.getItem("accountId");

    useEffect(() => {
        // Lấy danh sách mã khuyến mãi chung
        axios.get(`${REST_API_BASE_URL}/promotion/all`)
            .then(response => {
                const data = response.data;
                if (data.code === 200 && Array.isArray(data.result)) {
                    setCoupons(data.result);
                } else {
                    console.error("Không lấy được danh sách khuyến mãi:", data.message);
                }
            })
            .catch(error => {
                console.error("Lỗi kết nối đến API:", error);
            });

        // Nếu đã đăng nhập, lấy danh sách mã đã lưu của tài khoản
        if (accountId) {
            axios.get(`${REST_API_BASE_URL}/promotion/saved?accountId=${accountId}`)
                .then(response => {
                    const data = response.data;
                    if (data.code === 200 && Array.isArray(data.result)) {
                        const savedIds = new Set(data.result.map(promotion => promotion.id));
                        setSavedPromotionIds(savedIds);
                    } else {
                        console.warn("Không có mã đã lưu hoặc dữ liệu sai:", data.message);
                    }
                })
                .catch(error => {
                    console.error("Lỗi lấy mã đã lưu:", error);
                });
        }
    }, [accountId]);

    const handleSave = async (promotionId) => {
        if (!accountId) {
            window.location.href = "/login";
            return;
        }

        try {
            const response = await fetch(`${REST_API_BASE_URL}/promotion/save?promotionId=${promotionId}&accountId=${accountId}`, {
                method: "POST"
            });

            if (!response.ok) {
                throw new Error("Lỗi khi lưu mã khuyến mãi.");
            }

            const resultText = await response.text();
            alert(resultText);

            // Cập nhật trạng thái savedPromotionIds
            setSavedPromotionIds(prev => new Set([...prev, promotionId]));
        } catch (error) {
            console.error("Lỗi:", error);
            alert(error.message || "Không thể lưu mã. Vui lòng thử lại.");
        }
    };

    const toggleCondition = (code) => {
        const found = coupons.find(coupon => coupon.code === code);
        if (found) {
            setSelectedPromotion(found);
        }
    };

    const closeDetailModal = () => {
        setSelectedPromotion(null);
    };

    return (
        <>
            <div className="row scroll justify-content-xl-center">
                {coupons.map((coupon, index) => (
                    <div key={index} className="col-md-5 col-lg-6 col-9 col-xl-3 mb-4">
                        <div className="coupon_item no-icon">
                            <div className="coupon_body">
                                <div className="coupon_head">
                                    <h3 className="coupon_title">NHẬP MÃ: {coupon.code}</h3>
                                    <div className="coupon_desc">Giảm {coupon.percentageDiscount}%</div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap justify-content-between">
                                    {savedPromotionIds.has(coupon.id) ? (
                                        <button className="btn btn-secondary btn-sm ms-2" disabled>
                                            Đã lưu
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            style={{ background: "#c20808", color: "white" }}
                                            onClick={() => handleSave(coupon.id)}
                                        >
                                            Lưu mã
                                        </button>
                                    )}
                                    <span
                                        className="coupon_info_toggle text-primary ms-2"
                                        onClick={() => toggleCondition(coupon.code)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Điều kiện
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPromotion && (
                <DetailPromotion
                    promotion={selectedPromotion}
                    onCancel={closeDetailModal}
                />
            )}
        </>
    );
};

export default Coupon;
