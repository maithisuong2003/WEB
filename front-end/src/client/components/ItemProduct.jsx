import React from 'react'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductSlider from './ProductSlider.jsx';

const ItemProductComponent = ({ product }) => {
    const modalRef = useRef(null);
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigator = useNavigate();
    const getIdProduct = (id) => {
        setId(id);
        openModal();
    };
    function getProduct(id) {
        navigator(`/product/${id}`)
    }
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const minPrice = Math.min(...product.sizeColorProductsEntity.map(item => item.listPrice));
    const minDiscountPrice = Math.min(...product.sizeColorProductsEntity.map(item => item.discountPrice));
    const minDiscount = Math.min(...product.sizeColorProductsEntity.map(item => item.discount));
    return (
        <div className="col-6  col-sm-3  col-md-3 col-lg-3  product-col">
            {
                <div className="item_product_main">
                    <form action="/cart/add" method="post" className="variants product-action"
                        encType="multipart/form-data" data-tags='[]'>
                        <div className="product-thumbnail pos-relative">
                            <a className="image_thumb pos-relative embed-responsive embed-responsive-1by1"
                                onClick={() => getProduct(product.id)}
                                title="Happy Birthday Chocolate Cream Cake (Meta coupon)">
                                <img loading="lazy"
                                    className='product-thumbnail__img product-thumbnail__img--primary'
                                    width="480" height="480" style={{ '--image-scale': '1' }}
                                    src={product.imageProductEntity[0].image}
                                    alt={ product.imageProductEntity[0].image} />
                                <img loading="lazy"
                                    className='product-thumbnail__img product-thumbnail__img--secondary'
                                    width="480" height="480" style={{ '--image-scale': '1' }}
                                    src={product.imageProductEntity[1].image}
                                    alt={product.imageProductEntity[0].image} />
                            </a>
                            <div className="label_product d-none">
                                <div className="label_wrapper">
                                    - {minDiscount}%
                                </div>
                            </div>
                            <div className="product-action">
                                <div className="group_action">
                                    <a onClick={() => getIdProduct(product.id)} title="Xem nhanh"
                                        className="btn-views btn_view btn right-to quick-view">
                                        <i className="fa fa-paperclip" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="product-info">
                            <h3 className="product-name"><a
                                onClick={() => getProduct(product.id)}
                                title="Happy Birthday Chocolate Cream Cake (Meta coupon)">{product.nameProduct}</a></h3>
                            <div className="product-item-cta position-relative">
                                <div className="price-box">
                                    <span className="price product-price">{parseInt(minDiscountPrice).toLocaleString('it-IT')}₫</span>
                                    <span className="compare-price">{parseInt(minPrice).toLocaleString('it-IT')}₫</span>
                                    <div className="label_product d-inline-block">
                                        <div className="label_wrapper">
                                            - {minDiscount}%
                                        </div>
                                    </div>

                                </div>

                                <button onClick={() => getProduct(product.id)}
                                    className="product-item-btn btn-style2 btn left-to"
                                    title="Tùy chọn" type="button"
                                >
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            }
            <div className={`modal ${isModalOpen ? 'show' : ''}`}>
                <div className="modal-background" onClick={closeModal}></div>
                <div id="quick-view-product" className="quickview-product" >
                    <div className="quickview-overlay fancybox-overlay fancybox-overlay-fixed" onClick={closeModal}></div>
                    <div className="quick-view-product align-verticle" ref={modalRef}>
                        <ProductSlider product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemProductComponent