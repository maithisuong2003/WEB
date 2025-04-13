import React from 'react'
import { useEffect, useState, useRef } from 'react'
import Slider from "react-slick";
import Coupon from '../components/Coupon.jsx'
import { getLatestProduct, getMostViewedProduct, getProductByCategory, getTopSellingProduct } from '../services/ProductService.js'
import { useNavigate } from 'react-router-dom'
import ItemProductComponent from '../components/ItemProduct.jsx';
import Sidebar from '../layout/Sidebar.jsx';

const HomePage = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [lasestProduct, setLasestProduct] = useState([])
  const [mostViewedProduct, setMostViewedProduct] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getTopSellingProduct(4).then((response) => {
      setTopSellingProducts(response.data.result)
    }).catch((error) => { console.log(error) });
  }, [])

  useEffect(() => {
    getLatestProduct(6).then((response) => {
      setLasestProduct(response.data.result)
    }).catch((error) => { console.log(error) });
  }, [])

  useEffect(() => {
    getMostViewedProduct(4).then((response) => {
      setMostViewedProduct(response.data.result)
    }).catch((error) => { console.log(error) });
  }, [])
  const settingsForMainCarousel = {
    autoplay: false,
    autoplaySpeed: 6000,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const navigator = useNavigate();
  function getListProduct() {
    navigator(`/products`)
  }
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className="col-lg-3 d-lg-block d-none">
            <div className="subheader">
              <div className="toogle-nav-wrapper nav-index ">
                <div className="icon-bar btn menu-bar mr-2 p-0 d-inline-flex">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
                <strong>DANH MỤC SẢN PHẨM</strong>
              </div>
              <Sidebar />
            </div>
          </div>
          <div className="col-lg-9 col-12 pl-xl-0">
            <section className="section section_slider awe-section-1 mt-2 dis_slider">
              <div className="section_slider clearfix" style={{ maxHeight: '371px' }}>
                <div className="home-slider">
                  <Slider {...settingsForMainCarousel}>
                    <div className="items text-center">
                      <a onClick={() => getListProduct()} title="Sản phẩm nổi bật">
                        <picture>
                          <source media="(max-width: 480px)"
                            srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/slider_1.jpg?1704435927037" />
                          <img className=" img-fluid mx-auto"
                            src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/slider_1.jpg?1704435927037"
                            width="913" height="371" alt="Sản phẩm nổi bật" />
                        </picture>
                      </a>
                    </div>
                    <div className="items text-center">
                      <a onClick={() => getListProduct()} title="Khuyến mãi lớn chào xuân">
                        <picture>
                          <source media="(max-width: 480px)"
                            srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/slider_2.jpg?1704435927037" />
                          <img className=" img-fluid mx-auto" loading="lazy"
                            src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/slider_2.jpg?1704435927037"
                            width="913" height="371" alt="Khuyến mãi lớn chào xuân" />
                        </picture>
                      </a>
                    </div>
                  </Slider>
                </div>
              </div>
            </section>
            <section className="section section_coupons awe-section-2">
              <link rel="preload" as='style' type="text/css"
                href="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/coupon.css?1704435927037" />
              <link rel="stylesheet"
                href="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/coupon.css?1704435927037" />
              <div className="section_coupons">
                <div className="container">
                  <Coupon />
                </div>
              </div>
            </section>
            <section className="section section_flashsale awe-section-3">
              <div className="section_flashsale flashsale">
                <div className='flashsale__container'>
                  <div
                    className="title_module_main heading-bar d-flex justify-content-between align-items-center row px-0">
                    <div
                      className='d-flex align-items-center flex-wrap flashsale__header justify-content-between col-12'>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 className="heading-bar__title flashsale__title m-0">
                          <a className='link' onClick={() => getListProduct()} title="SẢN PHẨM BÁN CHẠY NHẤT">SẢN PHẨM BÁN CHẠY NHẤT</a>
                        </h2>
                        <img style={{ maxWidth: '30px', maxHeight: '20px' }} alt="SẢN PHẨM BÁN CHẠY NHẤT"
                          src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/flashsale-hot.png?1704435927037' />
                      </div>
                      <div className="flashsale__countdown-wrapper" style={{ display: 'none' }}>
                        <span className="flashsale__countdown-label mr-sm-2 mr-auto"
                          style={{ display: 'none' }}>Kết thúc sau</span>
                        <div className="flashsale__countdown" data-countdown-type="hours" data-countdown="">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row one-row">
                    {
                      topSellingProducts.map(product =>
                        <ItemProductComponent key={product.id} product={product} />
                      )
                    }
                  </div>
                </div>
              </div>
            </section>
            <section className="section section_collections awe-section-4">
              <div className="section_collections">
                <div className="mt-2 text-center row flex-nowrap collections-slide" style={{ '--item-per-row': '7' }}>

                  <div className="item">
                    <a onClick={() => navigate(`/products`)} title="Sản phẩm HOT"
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_1.jpg?1704435927037"
                        width="64" height="64" alt="coll_1_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products`)} title="Sản phẩm HOT">
                        Sản phẩm HOT
                      </a>
                    </h3>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh Chocolate`)} title="Bánh kem nhỏ"
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_2.jpg?1704435927037"
                        width="64" height="64" alt="coll_2_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products/Bánh Chocolate`)} title="Bánh kem nhỏ">
                        Bánh Chocolate
                      </a>
                    </h3>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh Tiramisu`)} title="Bánh ngọt "
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_3.jpg?1704435927037"
                        width="64" height="64" alt="coll_3_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products/Bánh Tiramisu`)} title="Bánh ngọt ">
                        Bánh Tiramisu
                      </a>
                    </h3>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh cupcake`)} title="Bánh kem "
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_4.jpg?1704435927037"
                        width="64" height="64" alt="coll_4_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products/Bánh cupcake`)} title="Bánh kem ">
                        Bánh cupcake
                      </a>
                    </h3>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh pumpkin`)} title="Bánh mì"
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_5.jpg?1704435927037"
                        width="64" height="64" alt="coll_5_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products/Bánh pumpkin`)} title="Bánh mì">
                        Bánh pumpkin
                      </a>
                    </h3>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Matcha`)} title="Bánh theo mùa "
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_6.jpg?1704435927037"
                        width="64" height="64" alt="coll_6_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products/Matcha`)} title="Bánh theo mùa ">
                        Matcha
                      </a>
                    </h3>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Valentine`)} title="Bánh đóng gói "
                      className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                        src="//bizweb.dktcdn.net/thumb/small/100/419/628/themes/897067/assets/coll_7.jpg?1704435927037"
                        width="64" height="64" alt="coll_7_title" />
                    </a>
                    <h3 className="mb-0">
                      <a onClick={() => navigate(`/products/Valentine`)} title="Bánh đóng gói ">
                        Valentine
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section_hot awe-section-5">
              <div className="section_product_new">

                <div className="title_module_main heading-bar d-flex" style={{ backgroundColor: '#2d2d2d' }}>
                  <h2 className="heading-bar__title" style={{ color: '#ffffff' }}>
                    <img src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/section-hot-icon.png?1704435927037'
                      alt='SẢN PHẨM MỚI NHẤT' />
                    <a className='link' onClick={() => getListProduct()} title="SẢN PHẨM MỚI NHẤT">SẢN PHẨM MỚI NHẤT</a>
                  </h2>
                </div>
                <div className='section__products'>

                  <div className="row mx-sm-0" data-section="hot-section">
                    <div
                      className="col-12 col-lg-6 text-center pb-3 product-col section-hot__banner d-none d-lg-block">
                      <a className="banner" onClick={() => getListProduct()} title="SẢN PHẨM MỚI NHẤT">
                        <picture>
                          <source media="(max-width: 480px)"
                            srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/section_hot.jpg?1704435927037" />
                          <img className=" img-fluid" loading="lazy"
                            src="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/section_hot.jpg?1704435927037"
                            width="472" height="345" alt="SẢN PHẨM MỚI NHẤT" />
                        </picture>
                      </a>
                    </div>
                    {
                      lasestProduct.map(product =>
                        <ItemProductComponent key={product.id} product={product} />
                      )
                    }
                  </div>
                  <div className="text-center mt-3 col-12">
                    <a onClick={getListProduct} title="Xem tất cả" className="btn btn-main btn-pill">
                      Xem tất cả
                      <svg className="icon">
                        <use xlinkHref="#icon-arrow" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section_banner awe-section-6">
              <div className="section_banner_adv">
                <a className="banner" title="Teabreak">
                  <picture>
                    <source media="(max-width: 600px)"
                      srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/section_hot_banner.png?1704435927037" />
                    <img className="img-fluid" loading="lazy"
                      src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/section_hot_banner.png?1704435927037"
                      alt="Teabreak" width="1200" height="108" />
                  </picture>

                </a>
              </div>
            </section>
            <section className="section section_product_top_1 awe-section-7">
              <div className="section_product_top">
                <div className="title_module_main heading-bar e-tabs d-flex justify-content-between align-items-center flex-wrap"
                  style={{ backgroundColor: '#212121' }}>
                  <h2 className="heading-bar__title" style={{ color: '#ffffff' }}>
                    <img src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/product_top_1-icon.png?1704435927037'
                      alt='QUÀ VALENTINE' />
                    <a className='link' onClick={() => getListProduct()} title="BÁNH NGỌT ">
                      ĐƯỢC XEM NHIỀU NHẤT
                    </a>
                  </h2>
                </div>
                <div className='e-tabs section__products'>
                  <div id="product_top_1-tab-1" className="content_extabcurrent">
                    <div className="row ml-sm-0 mr-sm-0 product-list" data-section="tab-section">
                      {
                        mostViewedProduct.map(product =>
                          <ItemProductComponent key={product.id} product={product} />
                        )
                      }
                    </div>
                    <div className="text-center mt-3 col-12">
                      <a onClick={getListProduct} title="Xem tất cả"
                        className="btn btn-main btn-icon btn-pill">
                        Xem tất cả

                        <svg className="icon">
                          <use xlinkHref="#icon-arrow" />
                        </svg> </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section_banner_coll_1 awe-section-8">
              <div className="section_banner_coll">
                <div className="row justify-content-md-center text-center justify-content-start">
                  <div className="item col-8 col-md-4">
                    <a className="banner" onClick={() => getListProduct()} title="Bánh bì">
                      <picture>
                        <source media="(max-width: 600px)"
                          srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/banner_coll_1_1.jpg?1704435927037" />
                        <img loading="lazy" className="img-fluid"
                          src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/banner_coll_1_1.jpg?1704435927037"
                          alt="banner_coll_1_1_title" width="289" height="175" />
                      </picture>

                    </a>
                  </div>
                  <div className="item col-8 col-md-4">
                    <a className="banner" onClick={() => getListProduct()} title="Bánh kem">
                      <picture>
                        <source media="(max-width: 600px)"
                          srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/banner_coll_1_2.jpg?1704435927037" />
                        <img loading="lazy" className="img-fluid"
                          src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/banner_coll_1_2.jpg?1704435927037"
                          alt="banner_coll_1_2_title" width="289" height="175" />
                      </picture>

                    </a>
                  </div>
                  <div className="item col-8 col-md-4">
                    <a className="banner" onClick={() => getListProduct()} title="Bánh kem nhỏ">
                      <picture>
                        <source media="(max-width: 600px)"
                          srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/banner_coll_1_3.jpg?1704435927037" />
                        <img loading="lazy" className="img-fluid"
                          src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/banner_coll_1_3.jpg?1704435927037"
                          alt="banner_coll_1_3_title" width="289" height="175" />
                      </picture>

                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section className="section section_policies awe-section-9">
              <div className='section_polices' style={{ backgroundColor: '#ffffff' }}>
                <div className="row justify-content-md-center justify-content-start">
                  <div className="item col-12 col-md-4">
                    <div className="banner">
                      <picture>
                        <source media="(max-width: 600px)"
                          srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/section_policies_1.jpg?1704435927037" />
                        <img loading="lazy" className="img-fluid"
                          src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/section_policies_1.jpg?1704435927037"
                          alt="section_policies_1_title" width="39" height="39" />
                      </picture>
                      <span className='ml-2'>Giao hàng đúng giờ</span>

                    </div>
                  </div>
                  <div className="item col-12 col-md-4">
                    <div className="banner">
                      <picture>
                        <source media="(max-width: 600px)"
                          srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/section_policies_2.jpg?1704435927037" />
                        <img loading="lazy" className="img-fluid"
                          src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/section_policies_2.jpg?1704435927037"
                          alt="section_policies_2_title" width="39" height="39" />
                      </picture>
                      <span className='ml-2'>Ưu đãi mỗi ngày</span>

                    </div>
                  </div>
                  <div className="item col-12 col-md-4">
                    <div className="banner">
                      <picture>
                        <source media="(max-width: 600px)"
                          srcSet="//bizweb.dktcdn.net/thumb/grande/100/419/628/themes/897067/assets/section_policies_3.jpg?1704435927037" />
                        <img loading="lazy" className="img-fluid"
                          src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/section_policies_3.jpg?1704435927037"
                          alt="section_policies_3_title" width="39" height="39" />
                      </picture>
                      <span className='ml-2'>Đổi trả trong vòng 7 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage