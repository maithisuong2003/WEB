import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { REST_API_BASE_URL } from '../services/ProductService';

const AddToCartSuccess = ({ handleClose, product, cartItem }) => {
    const [cart, setCart] = useState([]);
    const { token } = useAuth();
    const navigate = useNavigate();

    function getMyCart() {
        navigate('/cart');
    }

    useEffect(() => {
        axios.get(`${REST_API_BASE_URL}/carts/${cartItem.accountId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                setCart(response.data.result);
            })
            .
            catch(error => { console.error('Error:', error) });

    }, [cartItem]);
    const totalQuantity = cart.cartItems ? cart.cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    return (
        <div id="popupCartModal" className="modal fade show" role="dialog" style={{ display: 'block', paddingRight: 0 }} aria-modal="true">
            <div className="modal-dialog align-vertical">
                <div className="modal-content">
                    <button type="button" onClick={handleClose} className="close" data-dismiss="modal" data-backdrop="false" aria-label="Close" style={{ zIndex: 9 }}>
                        <span aria-hidden="true">×</span>
                    </button>
                    <div className="row row-noGutter">
                        <div className="modal-left col-sm-12 col-lg-12 col-md-12">
                            <h3 className="modal-title">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.00006 15.3803C12.0761 15.3803 15.3804 12.076 15.3804 7.99995C15.3804 3.92391 12.0761 0.619629 8.00006 0.619629C3.92403 0.619629 0.619751 3.92391 0.619751 7.99995C0.619751 12.076 3.92403 15.3803 8.00006 15.3803Z" fill="#2EB346"></path>
                                    <path d="M8 16C3.58916 16 0 12.4115 0 8C0 3.58916 3.58916 0 8 0C12.4115 0 16 3.58916 16 8C16 12.4115 12.4115 16 8 16ZM8 1.23934C4.27203 1.23934 1.23934 4.27203 1.23934 8C1.23934 11.728 4.27203 14.7607 8 14.7607C11.728 14.7607 14.7607 11.7273 14.7607 8C14.7607 4.27203 11.728 1.23934 8 1.23934Z" fill="#2EB346"></path>
                                    <path d="M7.03336 10.9434C6.8673 10.9434 6.70865 10.8771 6.59152 10.7582L4.30493 8.43438C4.06511 8.19023 4.06821 7.7986 4.31236 7.55816C4.55652 7.31898 4.94877 7.32145 5.18858 7.5656L7.0154 9.42213L10.7948 5.25979C11.0259 5.00635 11.4176 4.98838 11.6698 5.21766C11.9232 5.44757 11.9418 5.8392 11.7119 6.09326L7.49193 10.7408C7.3773 10.8672 7.21618 10.9403 7.04577 10.944C7.04143 10.9434 7.03771 10.9434 7.03336 10.9434Z" fill="white"></path>
                                </svg>
                                <span>Thêm vào giỏ hàng thành công</span>
                            </h3>
                            <div className="modal-body">
                                <div className="media">
                                    <div className="media-left thumb_img">
                                        <div className="thumb-1x1">
                                            <img loading="lazy" src={product.imageProductEntity[0].image} alt="Bánh cupcake queen" />
                                        </div>
                                    </div>
                                    <div className="media-body body_content">
                                        <div className="product-title">{product.nameProduct}</div>
                                        <div className="variant_title font-weight-light"><span>{cartItem.productSize} / {cartItem.productColor}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-right margin-top-10 col-sm-12 col-lg-12 col-md-12">
                            <div className="title right_title d-flex justify-content-between">
                                <a onClick={() => getMyCart()}> Giỏ hàng hiện có </a>
                                <div className="text-right">
                                    <span className="price">{parseInt(cart.totalPrice).toLocaleString('it-IT')}₫</span>
                                    <div className="count font-weight-light">
                                        (<span className="cart-popup-count">
                                            {totalQuantity}
                                        </span>) sản phẩm
                                    </div>
                                </div>
                            </div>
                            <div className="cart-action">
                                <a onClick={() => getMyCart()} className="btn btn-main btn-full">Thanh toán</a>
                                <a onClick={getMyCart} className="btn btn-main checkout_button btn-full">Xem giỏ hàng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddToCartSuccess