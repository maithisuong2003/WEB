import React, { useEffect, useState } from 'react';
import axios from "axios";
import {REST_API_BASE_URL} from "../services/ProductService.js";

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        axios.get(`${REST_API_BASE_URL}/promotion/all`)
            .then(response => {
                const data = response.data;
                if (data.code === 200 && data.result) {
                    setCoupons(data.result);
                } else {
                    console.error("Không lấy được danh sách khuyến mãi:", data.message);
                }
            })
            .catch(error => {
                console.error("Lỗi kết nối đến API:", error);
            });
    }, []);


    const handleCopy = (event) => {
        const copyText = "Sao chép";
        const copiedText = "Đã chép";
        const coupon = event.currentTarget.dataset.egaCoupon;
        const targetElement = event.currentTarget;
        targetElement.innerHTML = `<span>${copiedText}</span>`;
        targetElement.classList.add('disabled');
        setTimeout(() => {
            targetElement.innerHTML = `<span>${copyText}</span>`;
            targetElement.classList.remove('disabled');
        }, 3000);
        navigator.clipboard.writeText(coupon);
    }

    return (
        <div>
            <div className="row scroll justify-content-xl-center">
                {coupons.map((coupon, index) => (
                    <div key={index} className="col-md-5 col-lg-6 col-9 col-xl-3">
                        <div className="coupon_item no-icon">
                            <div className="coupon_body">
                                <div className="coupon_head">
                                    <h3 className="coupon_title">NHẬP MÃ: {coupon.code}</h3>
                                    <div className="coupon_desc">{coupon.description}</div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap justify-content-between">
                                    <button className="btn btn-main btn-sm coupon_copy"
                                            data-ega-coupon={coupon.code}
                                            onClick={handleCopy}>
                                        <span>Sao chép</span>
                                    </button>
                                    <span className="coupon_info_toggle" data-coupon={coupon.code}>
                                        Điều kiện
                                    </span>
                                    <div className="coupon_info">
                                        {coupon.condition}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Coupon;