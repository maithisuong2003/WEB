import React, { useEffect, useState } from 'react'
import QuantityInput from '../util/QuantityInput.jsx';
import AddToCartSuccess from './AddToCartSuccess.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LikeButtonComponent from './LikeButtonComponent.jsx';
import ProductRating from './ProductRating.jsx';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import Swal from 'sweetalert2';

const AddtoCart = ({ product }) => {
    const navigate = useNavigate();
    // Add to cart
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const uniqueSizes = new Set(product.sizeColorProductsEntity.map(p => p.size));
    const uniqueColors = new Set(product.sizeColorProductsEntity.map(p => p.color));
    const [selectedSizeOption, setSelectedSizeOption] = useState('');
    const [selectedColorOption, setSelectedColorOption] = useState('');
    const [availableColors, setAvailableColors] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [oldListPrice, setOldListPrice] = useState(0);
    const [oldDiscountPrice, setOldPrice] = useState(0);
    const [oldDiscount, setOldDiscount] = useState(0);
    const [oldQuantity, setOldQuantity] = useState(0);

    useEffect(() => {
        if (product.sizeColorProductsEntity.length > 0) {
            const initialProduct = product.sizeColorProductsEntity[0];
            setSelectedSizeOption(initialProduct.size);
            setSelectedColorOption(initialProduct.color);
            setAvailableColors([...new Set(product.sizeColorProductsEntity.map(p => p.color))]);
            setAvailableSizes([...new Set(product.sizeColorProductsEntity.map(p => p.size))]);
            updatePrices(initialProduct.size, initialProduct.color);
        }
    }, [product.sizeColorProductsEntity]);

    const handleSizeOptionChange = (event) => {
        const selectedSize = event.target.value;
        setSelectedSizeOption(selectedSize);

        const availableColorsForSize = product.sizeColorProductsEntity
            .filter((sizeColorProduct) => sizeColorProduct.size === selectedSize)
            .map((sizeColorProduct) => sizeColorProduct.color);

        setAvailableColors([...new Set(availableColorsForSize)]);

        if (!availableColorsForSize.includes(selectedColorOption)) {
            setSelectedColorOption('');
        }

        updatePrices(selectedSize, selectedColorOption);
    };

    const handleColorOptionChange = (event) => {
        const selectedColor = event.target.value;
        setSelectedColorOption(selectedColor);

        const availableSizesForColor = product.sizeColorProductsEntity
            .filter((sizeColorProduct) => sizeColorProduct.color === selectedColor)
            .map((sizeColorProduct) => sizeColorProduct.size);

        setAvailableSizes([...new Set(availableSizesForColor)]);

        if (!availableSizesForColor.includes(selectedSizeOption)) {
            setSelectedSizeOption('');
        }

        updatePrices(selectedSizeOption, selectedColor);
    };

    const updatePrices = (size, color) => {
        if (size && color) {
            const selectedProduct = product.sizeColorProductsEntity.find(
                (sizeColorProduct) => sizeColorProduct.size === size && sizeColorProduct.color === color
            );

            if (selectedProduct) {
                setAvailableColors([...new Set(product.sizeColorProductsEntity.map(p => p.color))]);
                setAvailableSizes([...new Set(product.sizeColorProductsEntity.map(p => p.size))]);
                setOldPrice(selectedProduct.discountPrice);
                setOldListPrice(selectedProduct.listPrice);
                setOldDiscount(selectedProduct.discount);
                setOldQuantity(selectedProduct.inventoryEntity.quantity);
            }
        }
    };


    useEffect(() => {
        if (selectedSizeOption && selectedColorOption) {
            updatePrices(selectedSizeOption, selectedColorOption);
        }
    }, [selectedSizeOption, selectedColorOption]);



    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };
    const { user, token } = useAuth();
    const { updateCart } = useCart();
    const [cartItem, setCartItem] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!user) {
            navigate('/login');
        } else {
            const cartItem = {
                accountId: user.id,
                productId: product.id,
                quantity: event.target.quantity.value,
                productSize: selectedSizeOption,
                productColor: selectedColorOption
            };
            if (cartItem.quantity > oldQuantity) {
                Swal.fire({
                    icon: 'error',
                    title: 'Số lượng sản phẩm không đủ',
                    text: 'Vui lòng chọn số lượng sản phẩm nhỏ hơn hoặc bằng số lượng hiện có',
                });
                return;
            }

            axios.post(`${REST_API_BASE_URL}/carts/add-item`, cartItem, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    setShowSuccessModal(true);
                    updateCart(response.data);
                    setCartItem(response.data.result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };
    const dataHref = window.location.href;

    return (
        <div className="col-xs-12 col-lg-6 details-pro bg-white py-3 mt-3 mt-lg-0 px-3">

            {/* Hiển thị thông báo thêm vào giỏ hàng thành công */}
            {showSuccessModal && (
                <AddToCartSuccess handleClose={handleCloseModal} product={product} cartItem={cartItem} />
            )}

            <h1 className="title-product">{product.nameProduct}</h1>
            <form encType="multipart/form-data" id="add-to-cart-form" className="form_background margin-bottom-0" onSubmit={handleSubmit}>
                <div className="group-status">
                    <span className="first_status mr-2">
                        Thương hiệu: &nbsp;
                        <span className="status_name">
                            {product.supplierEntity.nameSupplier}
                        </span>
                    </span>
                    <span className="first_status product_sku">
                        - Mã sản phẩm: {product.id}
                        <span className="status_name product-sku" itemProp="sku" content="MousseSocola">
                            {product.categoryEntity.nameCategorie}
                        </span>
                    </span>
                </div>
                <div className="price-box">
                    <span className="special-price"><span className="price product-price">{parseInt(oldDiscountPrice).toLocaleString('it-IT')}₫</span>
                    </span>
                    <span className="old-price">
                        <del className="product-price-old sale">{parseInt(oldListPrice).toLocaleString('it-IT')}₫</del>
                    </span>

                    <div className="label_product">
                        - {oldDiscount}%
                    </div>
                    <div className="save-price">
                        (Tiết kiệm: <span>{parseInt(product.sizeColorProductsEntity[0].listPrice - product.sizeColorProductsEntity[0].discountPrice).toLocaleString('it-IT')}₫</span>)
                    </div>
                </div>
                <ProductRating productId={product.id} accountId={user ? user.id : null} />

                <span className="product-promo-tag product-promo-tag--2 product-promo-tag--image"
                    style={{ '--color': '#a50a06', '--background': 'transparent', '--border-color': 'transparent' }}>
                    <img src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/promo_tag_2.png?1704435927037'
                        alt='Bánh mousse socola' />
                </span>
                <div className="product-summary">
                    <div className="rte">
                        <div className="product-summary-content">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
                <LikeButtonComponent dataHref={dataHref} />
                <div className="form-product pt-sm-2">
                    <div className='product-promotion rounded-sm' id='ega-salebox'>
                        <h3 className='product-promotion__heading rounded-sm d-inline-flex align-items-center'
                            style={{ backgroundColor: '#f33828', color: '#ffffff' }}>
                            <img src='//bizweb.dktcdn.net/100/419/628/themes/897067/assets/icon-product-promotion.png?1704435927037'
                                alt='Bánh mousse socola' width='16' height='16' className='mr-2' />
                            KHUYẾN MÃI - ƯU ĐÃI
                        </h3>

                        <ul className="promotion-box">

                            <li>Nhập mã <strong>EGANY</strong> thêm 5% đơn hàng
                            </li>
                            <li>Đồng giá Ship toàn quốc 25.000đ </li>
                            <li>Hỗ trợ 10.000 phí Ship cho đơn hàng từ 200.000đ</li>
                            <li>Miễn phí Ship cho đơn hàng từ 300.000đ</li>
                        </ul>
                    </div>
                    <div className='product-coupon__wrapper my-3'>
                        <strong className='d-block mb-2'>Mã giảm giá</strong>
                        <div className='product-coupons coupon-toggle-btn'>
                            <div className="coupon_item lite">
                                <div className='coupon_content'>
                                    EGA50
                                </div>
                            </div>
                            <div className="coupon_item lite">
                                <div className='coupon_content'>
                                    EGA15
                                </div>
                            </div>
                            <div className="coupon_item lite">
                                <div className='coupon_content'>
                                    EGA99K
                                </div>
                            </div>
                            <div className="coupon_item lite">
                                <div className='coupon_content'>
                                    FREESHIP
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form_button_details w-100">
                        <div className="form_product_content type1 ">
                            <div className="swatch clearfix" data-option-index="0">
                                <div className="header">Còn: {oldQuantity} sản phẩm</div>

                            </div>
                            <div className="swatch clearfix" data-option-index="0">
                                <div className="header">Kích thước:</div>
                                {[...uniqueSizes].map((size, index) => (
                                    <div className="position-relative" key={index}>
                                        <div className="swatch-element">
                                            <input
                                                required
                                                type="radio"
                                                id={`swatch-size-${index}`}
                                                name="sizeOption"
                                                value={size}
                                                checked={selectedSizeOption === size}
                                                onChange={handleSizeOptionChange}
                                                disabled={selectedColorOption && ![...uniqueSizes].includes(size)}
                                            />
                                            <label htmlFor={`swatch-size-${index}`}>{size}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="swatch clearfix swatch-color" data-option-index="1">
                                <div className="header">Màu sắc:</div>
                                {[...uniqueColors].map((color, index) => (
                                    <div className="position-relative" key={index}>
                                        <div className="swatch-element">
                                            <input
                                                required
                                                id={`swatch-color-${index}`}
                                                type="radio"
                                                name="colorOption"
                                                value={color}
                                                checked={selectedColorOption === color}
                                                onChange={handleColorOptionChange}
                                                disabled={selectedSizeOption && ![...uniqueColors].includes(color)}
                                            />
                                            <label htmlFor={`swatch-color-${index}`}>{color}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="soluong soluong_type_1 ">
                                <QuantityInput initialQuantity={1} />
                                <div className="button_actions mb-0">
                                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                                        <button type="submit"
                                            className="btn btn_add_cart btn-cart add_to_cart">
                                            THÊM VÀO GIỎ
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="button_actions ">
                                <button type="submit" className="btn btn_base buynow">
                                    MUA NGAY
                                </button>

                            </div>


                            <p className='product-hotline mb-0 text-center'>
                                Gọi đặt mua <a className="link" href="tel:1800.0000">1800.0000</a> (7:30
                                - 22:00)
                            </p>

                        </div>
                    </div>

                    <div className="product-policises-wrapper">
                        <ul className="product-policises list-unstyled py-sm-3 px-sm-3 m-0">
                            <li className="media">
                                <div className="mr-2">
                                    <img className="img-fluid " loading="lazy" width="24" height="24"
                                        src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/policy_product_image_1.png?1704435927037"
                                        alt="Hẹn giờ giao hàng" />
                                </div>
                                <div className="media-body">
                                    Hẹn giờ giao hàng
                                </div>
                            </li>
                            <li className="media">
                                <div className="mr-2">
                                    <img className="img-fluid " loading="lazy" width="24" height="24"
                                        src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/policy_product_image_2.png?1704435927037"
                                        alt="Ưu đãi mỗi ngày" />
                                </div>
                                <div className="media-body">
                                    Ưu đãi mỗi ngày
                                </div>
                            </li>
                            <li className="media">
                                <div className="mr-2">
                                    <img className="img-fluid " loading="lazy" width="24" height="24"
                                        src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/policy_product_image_4.png?1704435927037"
                                        alt="Đổi trả trong vòng 7 ngày" />
                                </div>
                                <div className="media-body">
                                    Đổi trả trong vòng 7 ngày
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddtoCart