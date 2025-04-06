import React from 'react'
const Coupon = () => {
    const handleCopy = (event) => {
        const copyText = "Sao chép";
        const copiedText = "Đã chép";
        const coupon = event.currentTarget.dataset.egaCoupon;
        const targetElement = event.currentTarget; // Lưu trữ tham chiếu đến phần tử hiện tại
        targetElement.innerHTML = `<span>${copiedText}</span>`;
        targetElement.classList.add('disabled');
        setTimeout(() => {
            targetElement.innerHTML = `<span>${copyText}</span>`;
            targetElement.classList.remove('disabled');
        }, 3000);
        navigator.clipboard.writeText(coupon);
    }
    return (
        <div>  <div className="row scroll justify-content-xl-center">
            <div className=" col-md-5 col-lg-6 col-9 col-xl-3">
                <div className="coupon_item no-icon">
                    <div className="coupon_body">
                        <div className="coupon_head">
                            <h3 className="coupon_title">NHẬP MÃ: EGA50</h3>
                            <div className="coupon_desc">Giảm 50% cho đơn hàng giá trị tối thiểu 500K. Mã giảm
                                tối đa 200K </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <button className="btn btn-main btn-sm coupon_copy" data-ega-coupon="EGA50" onClick={handleCopy}>
                                <span>Sao chép</span></button>
                            <span className="coupon_info_toggle" data-coupon="EGA50">
                                Điều kiện
                            </span>
                            <div className="coupon_info">
                                - Giá trị đơn hàng tối thiểu 500K. <br />
                                - Mỗi khách hàng được sử dụng tối đa 1 lần. </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-md-5 col-lg-6 col-9 col-xl-3">
                <div className="coupon_item no-icon">
                    <div className="coupon_body">
                        <div className="coupon_head">
                            <h3 className="coupon_title">NHẬP MÃ: EGA15</h3>
                            <div className="coupon_desc">Giảm 15% cho đơn hàng giá trị tối thiểu 500k. Mã giảm
                                tối đa 100K </div>

                        </div>
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <button className="btn btn-main btn-sm coupon_copy" data-ega-coupon="EGA15" onClick={handleCopy}>
                                <span>Sao chép</span></button>
                            <span className="coupon_info_toggle" data-coupon="EGA15">
                                Điều kiện
                            </span>
                            <div className="coupon_info">
                                - Đơn hàng giá trị tối thiểu 250K. <br />
                                - Chỉ áp dụng 1 mã giảm giá trên một đơn hàng. </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-md-5 col-lg-6 col-9 col-xl-3">
                <div className="coupon_item no-icon">
                    <div className="coupon_body">
                        <div className="coupon_head">
                            <h3 className="coupon_title">NHẬP MÃ: EGA99K</h3>
                            <div className="coupon_desc">Nhập mã EGA99K giảm ngay 99K </div>

                        </div>
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <button className="btn btn-main btn-sm coupon_copy" data-ega-coupon="EGA99K" onClick={handleCopy}>
                                <span>Sao chép</span></button>
                            <span className="coupon_info_toggle" data-coupon="EGA99K">
                                Điều kiện
                            </span>
                            <div className="coupon_info">
                                - Đơn hàng từ 1000K.<br />
                                - Chỉ áp dụng 1 mã giảm giá trên một đơn hàng. </div>

                        </div>
                    </div>
                </div>
            </div>



            <div className=" col-md-5 col-lg-6 col-9 col-xl-3">
                <div className="coupon_item no-icon">
                    <div className="coupon_body">
                        <div className="coupon_head">
                            <h3 className="coupon_title">NHẬP MÃ: FREESHIP</h3>
                            <div className="coupon_desc">Nhập mã FREESHIP miễn phí vận chuyển </div>

                        </div>
                        <div className="d-flex align-items-center flex-wrap justify-content-between">
                            <button className="btn btn-main btn-sm coupon_copy" data-ega-coupon="FREESHIP" onClick={handleCopy}>
                                <span>Sao chép</span></button>
                            <span className="coupon_info_toggle" data-coupon="FREESHIP">
                                Điều kiện
                            </span>
                            <div className="coupon_info">
                                - Đơn hàng từ 500K <br />
                                - Áp dụng cho khu vực Tp.HCM </div>

                        </div>
                    </div>
                </div>
            </div>
            <div id="coupon-modal" className="coupon-modal modal fade " role="dialog" style={{ display: 'none' }}>
                <div className="modal-dialog align-vertical">
                    <div className="modal-content">
                        <button type="button" className="close window-close" data-dismiss="modal" data-backdrop="false"
                            aria-label="Close" style={{ zIndex: '9' }}><span aria-hidden="true">×</span></button>
                        <div className="coupon-content"></div>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default Coupon