import React, {useContext} from 'react'
import { useEffect, useState, useRef } from 'react'
import Slider from "react-slick";
import Coupon from '../components/Coupon.jsx'
import { getLatestProduct, getMostViewedProduct, getProductByCategory, getTopSellingProduct } from '../services/ProductService.js'
import { useNavigate } from 'react-router-dom'
import ItemProductComponent from '../components/ItemProduct.jsx';
import Sidebar from '../layout/Sidebar.jsx';
import {useTranslation} from "react-i18next";


const HomePage = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [lasestProduct, setLasestProduct] = useState([])
  const [mostViewedProduct, setMostViewedProduct] = useState([])
  const navigate = useNavigate();
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const { t, i18n } = useTranslation();


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
      <div style={{marginTop: '20px'}}>

        <div className='container'>
          <div className='row'>
            <div className="col-lg-3 d-lg-block d-none">
              <div className="subheader">
                <div
                    className="toogle-nav-wrapper nav-index"
                    style={{
                      background: 'linear-gradient(90deg, #0f659b,#5fb3ea)'
                    }}
                >
                  <div className="icon-bar btn menu-bar mr-2 p-0 d-inline-flex">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                  <strong>{t('home.pcategory')}</strong>
                </div>

                <Sidebar/>
              </div>
            </div>
            <div className="col-lg-9 col-12 pl-xl-0">
              <div className="section_slider clearfix">
                <div className="home-slider">
                  <Slider {...settingsForMainCarousel}>
                    <div className="items text-center">
                      <a onClick={() => getListProduct()} title="Sản phẩm nổi bật">
                        <picture>
                          <source media="(max-width: 480px)"
                                  srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/slider_1.jpg?1704435927037"/>
                          <img className=" img-fluid mx-auto"
                               src="https://res.cloudinary.com/dhqv00way/image/upload/v1747672736/2_wihpr9.jpg"
                               width="913" height="371" alt="Sản phẩm nổi bật"/>
                        </picture>
                      </a>
                    </div>
                    <div className="items text-center">
                      <a onClick={() => getListProduct()} title="Khuyến mãi lớn chào xuân">
                        <picture>
                          <source media="(max-width: 480px)"
                                  srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/slider_2.jpg?1704435927037"/>
                          <img className=" img-fluid mx-auto" loading="lazy"
                               src="https://res.cloudinary.com/dhqv00way/image/upload/v1747672738/1_qt9cup.jpg"
                               width="913" height="371" alt="Khuyến mãi lớn chào xuân"/>
                        </picture>
                      </a>
                    </div>
                    <div className="items text-center">
                      <a onClick={() => getListProduct()} title="Khuyến mãi lớn chào xuân">
                        <picture>
                          <source media="(max-width: 480px)"
                                  srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/slider_2.jpg?1704435927037"/>
                          <img className=" img-fluid mx-auto" loading="lazy"
                               src="https://res.cloudinary.com/dhqv00way/image/upload/v1747672736/3_oryz40.jpg"
                               width="913" height="371" alt="Khuyến mãi lớn chào xuân"/>
                        </picture>
                      </a>
                    </div>
                  </Slider>
                </div>
              </div>

              <div className="section_coupons">
                <div className="container">
                  <Coupon/>
                </div>
              </div>
              <div className="section_flashsale flashsale" style={{backgroundColor: '#0074bf'}}>
                <div className='flashsale__container'>
                  <div
                      className="title_module_main heading-bar d-flex justify-content-between align-items-center row px-0">
                    <div
                        className='d-flex align-items-center flex-wrap flashsale__header justify-content-between col-12'>
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px',}}>
                        <h2 className="heading-bar__title flashsale__title m-0">
                          <a className='link' onClick={() => getListProduct()} title="SẢN PHẨM BÁN CHẠY NHẤT">
                            {t('home.pTopSell')}</a>
                        </h2>
                        <img style={{maxWidth: '30px', maxHeight: '20px'}} alt="SẢN PHẨM BÁN CHẠY NHẤT"
                             src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/flashsale-hot.png?1704435927037'/>
                      </div>
                      <div className="flashsale__countdown-wrapper" style={{display: 'none'}}>
                        <span className="flashsale__countdown-label mr-sm-2 mr-auto"
                              style={{display: 'none'}}>Kết thúc sau</span>
                        <div className="flashsale__countdown" data-countdown-type="hours" data-countdown="">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row one-row">
                    {
                      topSellingProducts.map(product =>
                          <ItemProductComponent key={product.id} product={product}/>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="section_collections">
                <div className="mt-2 text-center row flex-nowrap collections-slide" style={{'--item-per-row': '7'}} STY>

                  <div className="item">
                    <a onClick={() => navigate(`/products`)} title="Sản phẩm HOT"
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748423110/icon6_q0nght.jpg"
                           width="64" height="64" alt="coll_1_title"/>
                    </a>
                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh Chocolate`)} title="Bánh kem nhỏ"
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748422731/icon3_oopxgt.jpg"
                           width="64" height="64" alt="coll_2_title"/>
                    </a>

                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh Tiramisu`)} title="Bánh ngọt "
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748422731/icon5_myaoag.jpg"
                           width="64" height="64" alt="coll_3_title"/>
                    </a>

                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh cupcake`)} title="Bánh kem "
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748422731/icon4_cllwdi.jpg"
                           width="64" height="64" alt="coll_4_title"/>
                    </a>

                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Bánh pumpkin`)} title="Bánh mì"
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748422731/icon2_ojizfq.jpg"
                           width="64" height="64" alt="coll_5_title"/>
                    </a>

                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Matcha`)} title="Bánh theo mùa "
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748422731/icon1_vyf7t9.jpg"
                           width="64" height="64" alt="coll_6_title"/>
                    </a>

                  </div>

                  <div className="item">
                    <a onClick={() => navigate(`/products/Valentine`)} title="Bánh đóng gói "
                       className="pos-relative d-flex align-items-center ">
                      <img className="img-fluid m-auto object-contain mh-100" loading="lazy"
                           src="https://res.cloudinary.com/dhqv00way/image/upload/v1748423110/icon7_aoez68.jpg"
                           width="64" height="64" alt="coll_7_title"/>
                    </a>

                  </div>
                </div>
              </div>
              <section className="section section_hot awe-section-5">
                <div className="section_product_new">

                  <div className="title_module_main heading-bar d-flex" style={{backgroundColor: '#2d2d2d'}}>
                    <h2 className="heading-bar__title" style={{color: '#ffffff'}}>
                      <img src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/section-hot-icon.png?1704435927037'
                           alt='SẢN PHẨM MỚI NHẤT'/>
                      <a className='link' onClick={() => getListProduct()} title="SẢN PHẨM MỚI NHẤT">{t('home.pNew')}</a>
                    </h2>
                  </div>
                  <div className='section__products'>

                    <div className="row mx-sm-0" data-section="hot-section">
                      <div
                          className="col-12 col-lg-6 text-center pb-3 product-col section-hot__banner d-none d-lg-block">
                        <a className="banner" onClick={() => getListProduct()} title="SẢN PHẨM MỚI NHẤT">
                          <picture>
                            <source media="(max-width: 480px)"
                                    srcSet="//bizweb.dktcdn.net/thumb/large/100/419/628/themes/897067/assets/section_hot.jpg?1704435927037"/>
                            <img className=" img-fluid" loading="lazy"
                                 src="https://res.cloudinary.com/dhqv00way/image/upload/v1748424207/hi3_fuxqt9.jpg"
                                 width="472" height="445" alt="SẢN PHẨM MỚI NHẤT"/>
                          </picture>
                        </a>
                      </div>
                      {
                        lasestProduct.map(product =>
                            <ItemProductComponent key={product.id} product={product}/>
                        )
                      }
                    </div>
                    <div className="text-center mt-3 col-12">
                      <a onClick={getListProduct} title="Xem tất cả" className="btn btn-main btn-pill">
                        Xem tất cả
                        <svg className="icon">
                          <use xlinkHref="#icon-arrow"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section section_product_top_1 awe-section-7">
                <div className="section_product_top">
                  <div
                      className="title_module_main heading-bar e-tabs d-flex justify-content-between align-items-center flex-wrap"
                      style={{backgroundColor: '#212121'}}>
                    <h2 className="heading-bar__title" style={{color: '#ffffff'}}>
                      <img
                          src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/product_top_1-icon.png?1704435927037'
                          alt='QUÀ VALENTINE'/>
                      <a className='link' onClick={() => getListProduct()} title="BÁNH NGỌT ">
                        {t('home.pView')}
                      </a>
                    </h2>
                  </div>
                  <div className='e-tabs section__products'>
                    <div id="product_top_1-tab-1" className="content_extabcurrent">
                      <div className="row ml-sm-0 mr-sm-0 product-list" data-section="tab-section">
                        {
                          mostViewedProduct.map(product =>
                              <ItemProductComponent key={product.id} product={product}/>
                          )
                        }
                      </div>
                      <div className="text-center mt-3 col-12">
                        <a onClick={getListProduct} title="Xem tất cả"
                           className="btn btn-main btn-icon btn-pill">
                          Xem tất cả

                          <svg className="icon">
                            <use xlinkHref="#icon-arrow"/>
                          </svg></a>
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