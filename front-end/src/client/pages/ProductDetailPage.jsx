import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, getRecommendedProducts } from '../services/ProductService.js';
import ProductSlider from '../components/ProductSlider.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import Blog from '../components/Blog.jsx';
import CommentComponent from '../components/CommentComponent.jsx';
import { initFacebookSDK } from '../util/uitl.js';
import ItemProductComponent from '../components/ItemProduct.jsx';

const ProductDetailComponent = () => {
    window.scrollTo(0, 0);

    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getProduct(id).then((res) => {
                setProduct(res.data.result);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [id]);

    useEffect(() => {
        if (product && product.categoryEntity) {
            getRecommendedProducts(product.categoryEntity.id, 4).then((res) => {
                setRecommendedProducts(res.data.result);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [product]);

    const handleSeeMoreClick = (event) => {
        const seeMore = event.currentTarget;
        const contentWrapper = seeMore.closest('.js-content-wrapper');
        const proContent = contentWrapper.querySelector('.js-content');
        const proGetContent = contentWrapper.querySelector('.js-product-getcontent');

        seeMore.classList.toggle("show");
        if (seeMore.classList.contains('show')) {
            proGetContent.style.maxHeight = "none";
            seeMore.innerHTML = 'Thu gọn';
        } else {
            proGetContent.style.maxHeight = "400px";
            seeMore.innerHTML = 'Xem thêm';
            window.scrollTo({
                top: window.pageYOffset - 600,
                behavior: 'smooth'
            });
        }
    };

    // facebook comment
    const dataHref = window.location.href;
    useEffect(() => {
        initFacebookSDK();
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Breadcrumb />
            <ProductSlider product={product} />
            <section className="section sec_tab mt-0 mb-lg-4 mb-3 mb-sm-0">
                <div className="container">
                    <div className="row ml-sm-0 mr-sm-0">
                        <div className="col-12 pl-0 pr-0">
                            <div className="related-product">
                                <div className="title_module heading-bar d-flex justify-content-between align-items-center" style={{ backgroundColor: "#2d2d2d" }}>
                                    <h2 className="bf_flower heading-bar__title" tyle={{ color: "#ffffff" }}>
                                        <a onClick={() => navigate(`/products/${product.categoryEntity.nameCategory}`)} title="SẢN PHẨM THƯỜNG MUA CÙNG">
                                            SẢN PHẨM THƯỜNG MUA CÙNG
                                        </a>
                                    </h2>
                                </div>
                                <div id="sidebarproduct" className="card border-0 px-2 pt-1 pb-2">
                                    <div className="section_prd_feature section products product_related slick-product slickrelated row slick-initialized slick-slider">
                                        <div className="row one-row">
                                            {recommendedProducts.map((product) => (
                                                <ItemProductComponent key={product.id} product={product} />
                                            ))}
                                        </div>
                                    </div>
                                    <a onClick={() => navigate(`/products/${product.categoryEntity.nameCategory}`)} className="seemore btn btn-main btn-pill mx-auto mt-3" style={{}}>
                                        Xem tất cả
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section sec_tab">
                <div className="container">
                    <div className="row mr-sm-0 ml-sm-0 align-items-start">
                        <div className="mb-3 mb-sm-0 col-12 col-md-8 product-content js-content-wrapper card border-0">
                            <div className="title_module_main heading-bar d-flex justify-content-between align-items-center pl-0 pt-0">
                                <h2 className="heading-bar__title ">
                                    MÔ TẢ SẢN PHẨM
                                </h2>
                            </div>
                            <div id="ega-uti-editable-content" data-platform='sapo' data-id="24574538"
                                className="rte js-product-getcontent product_getcontent pos-relative"
                                style={{ '--content-height': '693px', maxHeight: '500px' }}>
                                <div id="content" className='content js-content'>
                                    <p>{product.description}</p>
                                    <p>&nbsp;</p>
                                    <p style={{ textAlign: 'center' }}>
                                        <img loading="lazy" alt={product.nameProduct}
                                            src={product.imageProductEntity.length > 0 ? product.imageProductEntity[0].image : ""} />
                                    </p>
                                    <p><span style={{ fontSize: '16px' }}><strong>HƯỚNG DẪN ĐẶT HÀNG ONLINE</strong></span></p>
                                    <p style={{ textAlign: 'center' }}>
                                        <img loading="lazy" data-thumb="grande" original-height="339" original-width="600"
                                            src="//bizweb.dktcdn.net/thumb/grande/100/419/628/files/group-1.jpg?v=1643132142843" />
                                    </p>
                                    <p><br />
                                        <span style={{ fontSize: '16px' }}><strong>HƯỚNG DẪN VẬN CHUYỂN VÀ BẢO QUẢN</strong></span>
                                    </p>
                                    <p>
                                        <img loading="lazy" data-thumb="original" original-height="780" original-width="2048"
                                            src="//bizweb.dktcdn.net/100/419/628/files/thiet-ke-khong-ten-4.jpg?v=1643981591199" />
                                    </p>
                                </div>
                            </div>
                            <div className="ega-pro__seemore text-center pos-relative mt-3">
                                <button
                                    title="Xem thêm"
                                    className="btn btn-main btn-pill mx-auto"
                                    onClick={handleSeeMoreClick} >
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 pl-0 pl-md-3 product-right pr-0">
                            <Blog />
                        </div>
                    </div>
                </div>
            </section>
            <CommentComponent dataHref={dataHref} />
        </div>
    );
};

export default ProductDetailComponent;
