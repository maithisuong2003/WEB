import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='top-footer'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-12 col-lg-8 col-xl-7 order-lg-1'>
              <div className='subscribe align-items-center'>
                <img src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/email-icon.svg?1704435927037'
                  width='32' height='32' loading='lazy' alt='email' />
                <h6 className="m-0">
                  Bạn muốn nhận khuyến mãi đặc biệt? Đăng ký ngay.
                </h6>
                <div className="form_register" style={{ flex: '1 1 100%' }}>
                  <form id="mc-form" className="newsletter-form custom-input-group" data-toggle="validator">
                    <input className="form-control input-group-field  " aria-label="Địa chỉ Email" type="email"
                      placeholder="Thả email nhận ngay ưu đãi.." name="EMAIL" required autoComplete="off" />
                    <div className="input-group-btn btn-action">
                      <button className="px-3 py-2 h-100 btn button_subscribe subscribe"
                        style={{ lineHeight: '24px' }}
                        type="submit" aria-label="Đăng ký nhận tin"
                        name="subscribe">Đăng ký</button>
                    </div>
                  </form>
                  <div className="mailchimp-alerts ">
                    <div className="mailchimp-submitting"></div>
                    <div className="mailchimp-success"></div>
                    <div className="mailchimp-error"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-4 col-xl-5 mt-3 mt-lg-0'>
              <div className="social-footer">
                <ul
                  className="follow_option mb-0 mt-2 mt-sm-0 d-flex flex-wrap align-items-center p-0 list-unstyled">
                  <li>
                    <a className="facebook link" href="https://bikipweb.site" target="_blank"
                      title="Theo dõi Facebook EGA Cake">
                      <img src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/facebook.png?1704435927037"
                        loading="lazy" width="36" height="36" alt="facebook" />
                    </a>
                  </li>

                  <li>
                    <a className="instgram link" href="https://bikipweb.site" target="_blank"
                      title="Theo dõi instgram EGA Cake">
                      <img src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/instagram.png?1704435927037"
                        loading="lazy" width="36" height="36" alt="instgram" />
                    </a>
                  </li>

                  <li>
                    <a className="youtube link" href="https://bikipweb.site" target="_blank"
                      title="Theo dõi youtube EGA Cake">
                      <img src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/youtube.png?1704435927037"
                        loading="lazy" width="36" height="36" alt="youtube" />
                    </a>
                  </li>

                  <li>
                    <a className="tiktok link" href="https://bikipweb.site" target="_blank"
                      title="Theo dõi tiktok EGA Cake">
                      <img src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/tiktok.png?1704435927037"
                        loading="lazy" width="36" height="36" alt="tiktok" />
                    </a>
                  </li>

                  <li>
                    <a className="zalo link" href="https://zalo.me/834141234794359440" target="_blank"
                      title="Theo dõi zalo EGA Cake">
                      <img src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/zalo.png?1704435927037"
                        loading="lazy" width="36" height="36" alt="zalo" />
                    </a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer bg-white">
        <div className="mid-footer">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-6 col-lg-3 footer-click footer-1">
                <a href="/public" className="logo-wrapper mb-3 d-block ">
                  <img loading="lazy"
                    src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/logo-footer.png?1704435927037"
                    alt="logo EGA Cake" width="164" height="50" />
                </a>
                <p>

                </p>
                <div className="single-contact">
                  <div className="content"><strong>Địa chỉ: </strong>
                    <span>150/8 Nguyễn Duy Cung, Phường 12, TP Hồ Chí Minh, </span>
                  </div>
                </div>
                <div className="single-contact">
                  <div className="content">
                    <strong>Số điện thoại: </strong>
                    <a className="link" title="19006750" href="tel:19006750">19006750</a>
                  </div>
                </div>
                <div className="single-contact">
                  <i className="fa fa-envelope"></i>
                  <div className="content">
                    <strong>Email: </strong><a title="support@sapo.vn" className="link"
                      href="mailto:support@sapo.vn">support@sapo.vn</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3 footer-click">
                <h4 className="title-menu clicked">
                  Hỗ trợ khách hàng <i className="fa fa-angle-down d-md-none d-inline-block"></i>
                </h4>
                <ul className="list-menu toggle-mn">
                  <li className="li_menu">
                    <a className="link" href="/gioi-thieu" title="Về chúng tôi">Về chúng tôi</a>
                  </li>
                  <li className="li_menu">
                    <a className="link" href="/he-thong-cua-hang" title="Hệ thống cửa hàng">Hệ thống cửa
                      hàng</a>
                  </li>
                  <li className="li_menu">
                    <a className="link" href="/goi-dien-dat-hang" title="Gọi điện đặt hàng">Gọi điện đặt
                      hàng</a>
                  </li>
                  <li className="li_menu">
                    <a className="link" href="/xuat-hoa-don-dien-tu" title="Xuất hoá đơn điện tử">Xuất hoá đơn
                      điện tử</a>
                  </li>
                </ul>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3 footer-click">
                <h4 className="title-menu clicked">
                  Chính sách <i className="fa fa-angle-down d-md-none d-inline-block"></i>
                </h4>
                <ul className="list-menu toggle-mn">
                  <li className="li_menu">
                    <a className="link" href="/chinh-sach-ban-hang" title="Chính sách bán hàng">Chính sách bán
                      hàng</a>
                  </li>
                  <li className="li_menu">
                    <a className="link" href="/chinh-sach-doi-tra" title="Chính sách đổi trả">Chính sách đổi
                      trả</a>
                  </li>
                  <li className="li_menu">
                    <a className="link" href="/chinh-sach-giao-hang" title="Chính sách giao hàng">Chính sách
                      giao hàng</a>
                  </li>
                </ul>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-3">
                <h4 className="title-menu">
                  Tổng đài hỗ trợ
                </h4>
                <p>
                  <span>Gọi mua hàng:</span>
                  <a className='text-primary font-weight-bold' href='tel:19006750'>19006750</a>
                  <span>(8h-20h)</span>
                </p>
                <p>
                  <span>
                    Gọi bảo hành:</span>
                  <a className='text-primary font-weight-bold' href='tel:19006750 '>19006750 </a>
                  <span>(8h-20h)</span>
                </p>
                <p>
                  <span>
                    Gọi khiếu nại:</span>
                  <a className='text-primary font-weight-bold' href='tel:19006750 '>19006750 </a>
                  <span> (8h-20h)</span>
                </p>

                <span className="title-menu">
                  Phương thức thanh toán
                </span>
                <div className="trustbadge">
                  <a href="/public" target="_blank" title="Phương thức thanh toán">
                    <img className=" img-fluid" loading="lazy"
                      src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/footer_trustbadge.jpg?1704435927037"
                      alt="" width="246" height="53" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-footer-bottom copyright clearfix py-2">
          <div className="container">
            <div className="row">
              <div id="copyright" className=" col-xl-4 col-xs-12 fot_copyright">

                <span className="wsp">
                  © Bản quyền thuộc về <a href="https://egany.com" rel="nofollow" target="_blank">EGANY</a>
                  | Cung cấp bởi <a
                    href="https://www.sapo.vn/?utm_campaign=cpn:kho_theme-plm:footer&utm_source=Tu_nhien&utm_medium=referral&utm_content=fm:text_link-km:-sz:&utm_term=&campaign=kho_theme-sapo"
                    rel="nofollow" title="Sapo" target="_blank">Sapo</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer