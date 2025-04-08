import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

const IntroductionPage = () => {
    return (
        <div>
            <Breadcrumb page="Giới thiệu" />
            <section className="page section">
                <div className="container card py-2">
                    <div className="wrap_background_aside margin-bottom-40">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <div className="heading-bar">
                                    <h1 className="title_page">
                                        <a>Giới thiệu</a>
                                    </h1>
                                </div>
                                <div className="content-page rte py-3">
                                    <p>
                                        Công ty được thành lập từ năm 1960 trải qua hơn 50 năm phấn đấu và
                                        trưởng thành Công ty đã không ngừng lớn mạnh, tích lũy được nhiều
                                        kinh nghiệm trong sản xuất kinh doanh. Với đội ngũ lãnh đạo giàu
                                        kinh nghiệm, chiến lược kinh doanh tốt, đội ngũ kỹ sư được đào tạo
                                        chuyên ngành có năng lực và lực lượng công nhân giỏi tay nghề Công
                                        ty&nbsp; đã tiến bước vững chắc và phát triển liên tục để giữ vững
                                        uy tín và chất lượng xứng đáng với niềm tin yêu của người tiêu
                                        dùng.
                                    </p>
                                    <p>
                                        Công ty chính thức hoạt động dưới hình thức Công ty cổ phần từ
                                        ngày 20/01/2004 theo Giấy chứng nhận đăng ký kinh doanh số
                                        012348765 do Sở Kế hoạch và đầu tư thành phố Hà Nội cấp và thay
                                        đổi lần thứ bảy ngày 09/05/2018. Các hoạt động sản xuất kinh doanh
                                        chính bao gồm:
                                    </p>
                                    <p style={{ marginLeft: 40 }}>&nbsp;</p>
                                    <ul>
                                        <li style={{ marginLeft: 40 }}>
                                            &nbsp;Sản xuất, kinh doanh bánh kẹo và chế biến thực phẩm.
                                        </li>
                                        <li style={{ marginLeft: 40 }}>
                                            &nbsp;Kinh doanh xuất nhập khẩu: nguyên vật liệu, máy móc thiết
                                            bị, sản phẩm chuyên ngành, hàng hoá tiêu dùng và các sản phẩm
                                            hàng hoá khác.&nbsp;
                                        </li>
                                        <li style={{ marginLeft: 40 }}>
                                            &nbsp;Đầu tư xây dựng, cho thuê văn phòng, nhà ở, trung tâm
                                            thương mại.
                                        </li>
                                        <li style={{ marginLeft: 40 }}>
                                            &nbsp;Kinh doanh các ngành nghề khác không bị cấm theo các quy
                                            định của pháp luật.
                                        </li>
                                    </ul>
                                    <p>
                                        Sản phẩm của chúng tôi&nbsp;liên tục được người tiêu dùng mến mộ
                                        và bình chọn là “Hàng Việt nam chất lượng cao”.
                                    </p>
                                    <p>&nbsp;</p>
                                    <iframe
                                        width={950}
                                        height={534}
                                        src="https://www.youtube.com/embed/48SOw1_GP60"
                                        title="How we build low-cost products at EGANY"
                                        frameBorder={0}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default IntroductionPage