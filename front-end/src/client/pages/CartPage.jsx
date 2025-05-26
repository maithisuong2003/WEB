import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import MyPayPalButton from '../util/MyPayPalButton.jsx';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import '../assets/css/voucher.css';
const CartPage = () => {
   const navigate = useNavigate();
   const [cart, setCart] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const {user, token} = useAuth();
   const {updateCart} = useCart();
   const [note, setNote] = useState('');
   const [deliveryAt, setDeliveryAt] = useState('');
   const [address, setAddress] = useState('');
   const [isFormComplete, setIsFormComplete] = useState(false);
   const [savedPromotions, setSavedPromotions] = useState([]);
   const [showPromotions, setShowPromotions] = useState(false);
   const [selectedPromotion, setSelectedPromotion] = useState(null);
   const [manualCode, setManualCode] = useState(''); // State cho mã nhập thủ công
   const [errorMessage, setErrorMessage] = useState(''); // State cho thông báo lỗi

   const [orderData, setOrderData] = useState({
      address: '',
      deliveryAt: '',
      note: '',
      sale: ''
   });


   // Xử lý thay đổi giá trị các ô nhập liệu
   const handleInputChange = (e) => {
      const { id, value } = e.target;
      setOrderData((prev) => ({ ...prev, [id]: value }));
      if (id === 'note') setNote(value);
      if (id === 'datepicker') setDeliveryAt(value);
      if (id === 'address') setAddress(value);
   };
   // Kiểm tra xem form đã hoàn thiện chưa
   useEffect(() => {
      setIsFormComplete(address && deliveryAt);
   }, [address, deliveryAt]);

   useEffect(() => {
      const orderData = {
         address: address,
         deliveryAt: deliveryAt,
         note: note,
         sale: ''
      };

      setIsFormComplete(address && deliveryAt); // Check if the required fields are filled
   }, [address, deliveryAt, note]);

   if (!user) {
      navigate('/login');
   }

   function getProduct(id) {
      navigate(`/product/${id}`);
   }

   function getLoginPage() {
      navigate('/login');
   }

   function getHomePage() {
      navigate('/');
   }

   useEffect(() => {
      if (!token) {
         getLoginPage();
         return;
      }

      axios.get(`${REST_API_BASE_URL}/carts/my-cart`, {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      })
          .then(response => {
             setCart(response.data.result);
             let reversedCartItems = response.data.result.cartItems.reverse();
             setCartItems(reversedCartItems);
          })
          .catch(error => {
             console.error("There was an error with the Axios operation:", error);
          });
   }, [token, updateCart]);

   const deleteCartItem = (cartItemId) => {
      axios.delete(`${REST_API_BASE_URL}/carts/remove-item/${cartItemId}`, {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      })
          .then(response => {
             updateCart(response.data.result);
          })
          .catch(error => {
             console.error("There was an error removing the cart item:", error);
          });
   };

   // Hàm tăng số lượng sản phẩm trong giỏ hàng
   const increaseQuantity = (cartItemId) => {
      axios.put(`${REST_API_BASE_URL}/carts/increase-quantity/${cartItemId}`, {}, {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      })
          .then(response => {
             updateCart(response.data.result);
          })
          .catch(error => {
             Swal.fire({
                icon: 'error',
                title: 'Số lượng sản phẩm đã hết',
                text: 'Số lượng sản phẩm trong kho không đủ.',
             });
          });
   };

   // Hàm giảm số lượng sản phẩm trong giỏ hàng
   const decreaseQuantity = (cartItemId) => {
      axios.put(`${REST_API_BASE_URL}/carts/decrease-quantity/${cartItemId}`, {}, {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      })
          .then(response => {
             updateCart(response.data.result);
          })
          .catch(error => {
             console.error("There was an error decreasing the item quantity:", error);
          });
   };

   const handleCheckout = () => {
      const address = document.getElementById('address').value;
      const deliveryAt = document.getElementById('datepicker').value;
      const note = document.getElementById('note').value;


      if (!address || !deliveryAt) {
         Swal.fire({
            icon: 'error',
            title: 'Chưa đủ thông tin',
            text: 'Vui lòng điền đầy đủ thông tin.',
         });
         return;
      }

      const orderData = {
         address: address,
         deliveryAt: deliveryAt,
         note: note || '',
         sale: ''
      };

      axios.post(`${REST_API_BASE_URL}/orders`, orderData, {
         headers: {
            "Authorization": `Bearer ${token}`
         }
      })
          .then(response => {
             updateCart(response.data.result);
             console.log(response.data.result);
             Swal.fire({
                icon: 'success',
                title: 'Đặt hàng',
                text: 'Đặt hàng thành công!',
             });
          })
          .catch(error => {
             console.error('There was an error placing the order:', error);
             Swal.fire({
                icon: 'error',
                title: 'Đặt hàng',
                text: 'Đặt hàng thất bại. Vui lòng thử lại!',
             });
          });
   };
   const [minDate, setMinDate] = useState('');
   useEffect(() => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      setMinDate(`${yyyy}-${mm}-${dd}`);
   }, []);
   // Lấy danh sách mã giảm giá đã lưu từ API
   useEffect(() => {
      if (user && token) {
         axios
             .get(`${REST_API_BASE_URL}/promotion/saved?accountId=${user.id}`, {
                headers: {
                   Authorization: `Bearer ${token}`,
                },
             })
             .then((response) => {
                const data = response.data;
                if (data.code === 200 && Array.isArray(data.result)) {
                   setSavedPromotions(data.result);
                } else {
                   console.warn('Không lấy được danh sách mã đã lưu:', data.message);
                }
             })
             .catch((error) => {
                console.error('Lỗi khi lấy danh sách mã đã lưu:', error);
                Swal.fire({
                   icon: 'error',
                   title: 'Lỗi',
                   text: 'Không thể tải danh sách mã giảm giá. Vui lòng thử lại!',
                });
             });
      }
   }, [user, token]);
   // Xử lý khi chọn mã giảm giá
   const handleSelectPromotion = (promotion) => {
      setSelectedPromotion(promotion);
      setOrderData((prev) => ({ ...prev, sale: promotion.code }));
      setShowPromotions(false);
      Swal.fire({
         icon: 'success',
         title: 'Áp dụng mã thành công',
         text: `Mã ${promotion.code} đã được áp dụng!`,
      });
   };

   const handleDeselectPromotion = () => {
      setSelectedPromotion(null);
      setOrderData((prev) => ({ ...prev, sale: '' }));
   };

   const handleApplyManualCode = () => {
      const promotion = savedPromotions.find(
          (promo) => promo.code.toLowerCase() === manualCode.toLowerCase() && isPromotionValid(promo)
      );
      if (promotion) {
         handleSelectPromotion(promotion);
         setManualCode('');
         setErrorMessage(''); // Xóa thông báo lỗi nếu mã hợp lệ
      } else {
         setErrorMessage('Rất tiếc! Không thể tìm thấy mã voucher này.'); // Hiển thị thông báo lỗi
      }
   };
   // Tính giá cuối cùng sau khi áp dụng mã giảm giá
   const finalPrice = selectedPromotion
       ? selectedPromotion.percentageDiscount
           ? parseInt(cart.totalPrice) * (1 - selectedPromotion.percentageDiscount / 100)
           : parseInt(cart.totalPrice) - parseInt(selectedPromotion.fixedDiscount)
       : parseInt(cart.totalPrice);

   // Kiểm tra mã giảm giá còn hiệu lực không
   const isPromotionValid = (promotion) => new Date(promotion.endTime) > new Date();

   return (
       <section className="main-cart-page main-container col1-layout mobile-tab active" id="cart-tab" data-title="Giỏ hàng">
          <div className="wrap_background_aside padding-top-15 margin-bottom-40 padding-left-0 padding-right-0 cartmbstyle">
             <div className="cart-mobile container card border-0 py-2">
                {cartItems.length > 0 ? (
                    <form className="margin-bottom-0">
                       <div className="header-cart">
                          <div className=" title_cart_mobile heading-bar">
                             <h1 className="heading-bar__title">Giỏ hàng</h1>
                          </div>
                       </div>
                       <div className="header-cart-content">
                          <div className="cart_page_mobile content-product-list">
                             {
                                cartItems.map((item, index) => (
                                    <div key={index} className="item-product">
                                       <div className="text-center">
                                          <a onClick={() => deleteCartItem(item.id)} className="remove-itemx remove-item-cart " title="Xóa">
                                             <svg className="icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0)">
                                                   <path d="M0.620965 12C0.462896 12 0.304826 11.9399 0.184729 11.8189C-0.0563681 11.5778 -0.0563681 11.1869 0.184729 10.9458L10.9497 0.180823C11.1908 -0.0602744 11.5817 -0.0602744 11.8228 0.180823C12.0639 0.421921 12.0639 0.8128 11.8228 1.05405L1.05795 11.8189C0.936954 11.9392 0.778884 12 0.620965 12Z" fill="#8C9196"></path>
                                                   <path d="M11.3867 12C11.2287 12 11.0707 11.9399 10.9505 11.8189L0.184729 1.05405C-0.0563681 0.8128 -0.0563681 0.421921 0.184729 0.180823C0.425827 -0.0602744 0.816706 -0.0602744 1.05795 0.180823L11.8228 10.9458C12.0639 11.1869 12.0639 11.5778 11.8228 11.8189C11.7018 11.9392 11.5439 12 11.3867 12Z" fill="#8C9196"></path>
                                                </g>
                                             </svg>
                                          </a>
                                       </div>
                                       <div className="item-product-cart-mobile">
                                          <a onClick={() => getProduct(item.productEntity.id)} className="product-images1  pos-relative embed-responsive embed-responsive-1by1" title={item.productEntity.nameProduct}>
                                             <img className="img-fluid" src={item.productEntity.imageProductEntity[0].image} alt={item.productEntity.nameProduct} />
                                          </a>
                                       </div>
                                       <div className="product-cart-infor">
                                          <div className="title-product-cart-mobile">
                                             <h3 className="product-name"> <a onClick={() => getProduct(item.productEntity.id)} className="text2line" title="Bánh blue sky cupcakes">
                                                {item.productEntity.nameProduct}</a>
                                             </h3>
                                             <span className="variant-title">{item.productSize} / {item.productColor}</span>
                                          </div>
                                          <div className="cart-price">
                                             <span className="product-price price">{parseInt(item.price).toLocaleString('it-IT')}₫</span>
                                          </div>
                                          <div className="custom input_number_product custom-btn-number">
                                             <button className="btn btn_num num_1 button button_qty" type="button" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                             </button>
                                             <input
                                                 required
                                                 type="text"
                                                 name="quantity"
                                                 value={item.quantity}
                                                 maxLength="3"
                                                 className="form-control prd_quantity pd-qtym"
                                                 readOnly
                                             />
                                             <button className="btn btn_num num_2 button button_qty" type="button" onClick={() => increaseQuantity(item.id)}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                ))
                             }
                             <div className="cart-note">
                                <label htmlFor="note" className="note-label">Ghi chú đơn hàng</label>
                                <textarea id="note" name="note" rows="8" onChange={handleInputChange}></textarea>
                             </div>
                          </div>
                          <div className="header-cart-price">
                             <div className="timedeli-modal">
                                <div className="timedeli-modal-content">
                                   <button type="button" className="close window-close d-sm-none" aria-label="Close">
                                      <span aria-hidden="true">×</span></button>
                                   <div className="timedeli d-sm-block">
                                      <div className="checkout-form-container p-3 bg-light rounded shadow-sm">
                                         <h4 className="mb-3 font-weight-bold text-primary">Thông tin giao hàng</h4>
                                         <div className="form-group mb-3">
                                            <label htmlFor="datepicker" className="form-label">Ngày nhận hàng</label>
                                            <input
                                                id="datepicker"
                                                type="date"
                                                className="form-control"
                                                min={minDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                         </div>
                                         <div className="form-group mb-3">
                                            <label htmlFor="nameOrder" className="form-label">Họ và tên</label>
                                            <input
                                                id="nameOrder"
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập họ và tên người nhận"
                                                required
                                            />
                                         </div>
                                         <div className="form-group mb-3">
                                            <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                                            <input
                                                id="phoneNumber"
                                                type="tel"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                required
                                            />
                                         </div>
                                         <div className="form-group mb-3">
                                            <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                                            <input
                                                id="address"
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ nhận hàng"
                                                onChange={handleInputChange}
                                                required
                                            />
                                         </div>
                                         <div className="form-group mb-3">
                                            <label htmlFor="note" className="form-label">Ghi chú đơn hàng (nếu
                                               có)</label>
                                            <textarea
                                                id="note"
                                                rows="3"
                                                className="form-control"
                                                placeholder="Nhập ghi chú cho đơn hàng"
                                                onChange={handleInputChange}
                                            ></textarea>
                                         </div>

                                      </div>

                                   </div>
                                   <div className="timedeli-cta">
                                      <button className="btn btn-block timedeli-btn  d-sm-none" type="button">
                                         <span>Xong</span>
                                      </button>
                                   </div>
                                </div>
                                <div className="total-line-table__tbody">
                                   <div className="total-line total-line--subtotal d-sm-flex justify-content-between">
                                      <div className="total-line__name">
                                         <strong>Tạm tính</strong>
                                      </div>
                                      <div className="total-line__price">
                                         {parseInt(cart.totalPrice).toLocaleString('it-IT')}₫
                                      </div>
                                   </div>
                                   <div
                                       className="total-line total-line--shipping-fee d-sm-flex justify-content-between">
                                      <div className="total-line__name">
                                         <strong>Phí vận chuyển</strong>
                                      </div>
                                      <div className="total-line__price">
                                         <span className="origin-price"
                                               data-bind="getTextShippingPriceOriginal()"></span>
                                         <span data-bind="getTextShippingPriceFinal()">40.000₫</span>
                                      </div>
                                   </div>
                                   {selectedPromotion && (
                                       <div
                                           className="total-line total-line--discount d-sm-flex justify-content-between">
                                          <div className="total-line__name">
                                             <strong>Mã giảm giá ({selectedPromotion.code})</strong>
                                             <button className="btn btn-link text-danger p-0 ms-2"
                                                     onClick={handleDeselectPromotion}>
                                                (Xóa)
                                             </button>
                                          </div>
                                          <div className="total-line__price">
                                             {selectedPromotion.percentageDiscount
                                                 ? `-${selectedPromotion.percentageDiscount}%`
                                                 : `-${parseInt(selectedPromotion.fixedDiscount).toLocaleString('it-IT')}₫`}
                                          </div>
                                       </div>
                                   )}
                                </div>
                             </div>
                             <div className="title-cart d-none d-sm-flex ">
                                <h3 className="text-xs-left">TỔNG CỘNG</h3>
                                <span className="text-xs-right totals_price_mobile">
                                 {parseInt(finalPrice).toLocaleString('it-IT')}₫
                              </span>
                                <i className="text-xs-right price_vat ">(Đã bao gồm VAT nếu có)</i>
                             </div>
                             <div className="coupon-toggle d-flex justify-content-between align-items-center">
                                <div>
                                   <img className="mr-1"
                                        src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/coupon-icon.png?1704435927037"
                                        alt="delivery"/>
                                   <span>Mã giảm giá</span>
                                </div>
                                <div className="coupon-toggle-btn">
                                 <span className="mr-1" onClick={() => setShowPromotions(true)}
                                       style={{cursor: 'pointer'}}>
                                    Chọn mã giảm giá
                                 </span>
                                </div>
                             </div>
                             <Modal show={showPromotions} onHide={() => setShowPromotions(false)} centered>
                                <Modal.Header>
                                   <Modal.Title>Ưu đãi dành riêng cho bạn</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                   <div className="coupon-container">
                                      <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                                         <label className="coupon-label">Mã Voucher</label>
                                         <div className="coupon-input-wrapper">
                                            <input
                                                type="text"
                                                placeholder="Nhập mã giảm giá"
                                                value={manualCode}
                                                onChange={(e) => {
                                                   setManualCode(e.target.value);
                                                   setErrorMessage('');
                                                }}
                                                className="coupon-input"
                                            />
                                            {manualCode && (
                                                <span
                                                    onClick={() => {
                                                       setManualCode('');
                                                       setErrorMessage('');
                                                    }}
                                                    className="coupon-clear" > ×</span>
                                            )}
                                         </div>
                                         <Button
                                             variant="primary"
                                             onClick={handleApplyManualCode}
                                             disabled={!manualCode.trim()}
                                             className="coupon-apply-btn"
                                         >
                                            Áp dụng
                                         </Button>
                                      </div>
                                      {errorMessage && (
                                          <p className="coupon-error">
                                             {errorMessage}
                                          </p>
                                      )}
                                   </div>
                                   {savedPromotions.filter(isPromotionValid).length > 0 ? (
                                       <div>
                                          {savedPromotions.filter(isPromotionValid).map((promotion) => (
                                              <div
                                                  key={promotion.id}
                                                  className={`promotion-card ${selectedPromotion && selectedPromotion.id === promotion.id ? 'selected' : ''}`}
                                                  onClick={() => handleSelectPromotion(promotion)}
                                              >
                                                 <div className="promotion-card-body">
                                                    <div className="promotion-logo"></div>
                                                    <div className="promotion-info">
                                                       <div className="promotion-header">
                           <span className="promotion-header-text"> Giảm  {promotion.percentageDiscount}% Giảm tối đa
                              {promotion.fixedDiscount ? ` ${(promotion.fixedDiscount / 1000).toLocaleString('it-IT')}k ` : ''}
                           </span>
                                                          <span className="promotion-quantity">x{promotion.quantity || 6}</span>
                                                       </div>
                                                       <div className="promotion-details">
                                                          {`₫${(promotion.minOrder || 90000).toLocaleString('it-IT')} Đơn Tối Thiểu ₫${(promotion.fixedDiscount || 0).toLocaleString('it-IT')}`}
                                                       </div>
                                                       <div className="promotion-expiry">
                                                          Đang hiệu lực - HSD: {new Date(promotion.endTime).toLocaleDateString('vi-VN')}
                                                       </div>
                                                    </div>
                                                 </div>
                                              </div>
                                          ))}
                                       </div>
                                   ) : (
                                       <p className="text-center">Không có mã giảm giá nào còn hiệu lực.</p>
                                   )}
                                </Modal.Body>
                                <Modal.Footer className="justify-content-center">
                                   <Button
                                       variant="secondary"
                                       onClick={() => setShowPromotions(false)}
                                       style={{ backgroundColor: '#ff5722', color: 'white' }}
                                   >
                                      Đóng
                                   </Button>
                                </Modal.Footer>
                             </Modal>

                             <div className="checkout d-none d-sm-block">
                                <button className="btn btn-block btn-proceed-checkout-mobile"
                                        title="Tiến hành thanh toán" type="button" onClick={handleCheckout}>
                                   <span>Thanh Toán</span>
                                </button>
                             </div>
                             <div className="cart-trustbadge mt-3">
                              <span className="title-menu">
                                 Phương thức thanh toán
                              </span>
                                <div className="trustbadge">
                                   <a target="_blank" title="Phương thức thanh toán">
                                      <img className=" img-fluid"
                                           src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/footer_trustbadge.jpg?1704435927037"
                                           alt="" width="246" height="53"/>
                                   </a>
                                </div>
                             </div>
                             {isFormComplete ? (
                                 <MyPayPalButton
                                     total={cart.totalPrice}
                                     currency="USD"
                                     description="Payment for order"
                                     orderData={orderData}
                                     token={token}
                                     updateCart={updateCart}
                                 />
                             ) : (
                                 <div className="text-danger">Vui lòng điền vào tất cả các trường bắt buộc để kích hoạt
                                    thanh toán PayPal.</div>
                             )}
                          </div>
                       </div>
                    </form>
                ) : (
                    <div className="cart-empty container card border-0 py-2 ">
                       <div className="alert green-alert section" role="alert">
                          <div className="title-cart text-center">
                             <h1 className="d-none">Giỏ hàng</h1>
                             <div>
                                <img
                                    src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/cart_empty_background.png?1704435927037"
                                    className="img-fluid" width="298" height="152"/>
                             </div>
                             <h3>
                                "Hổng” có gì trong giỏ hết
                             </h3>
                             <p> Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
                             <a onClick={getHomePage} title="Mua sắm ngay" className="btn btn-main">Mua sắm ngay</a>
                          </div>
                       </div>
                    </div>
                )}
             </div>
             <div className="cart-empty container card border-0 py-2 " style={{display: 'none'}}>
                <div className="alert green-alert section" role="alert">
                   <div className="title-cart text-center">
                      <h1 className="d-none">Giỏ hàng</h1>
                      <div>
                         <img
                             src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/cart_empty_background.png?1704435927037"
                             className="img-fluid" width="298" height="152"/>
                      </div>
                      <h3>
                         Hổng có gì trong giỏ hết
                      </h3>
                      <p> Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</p>
                      <a title="Mua sắm ngay" className="btn btn-main">Mua sắm ngay</a>
                   </div>
                </div>
             </div>
          </div>
       </section>
   );

};

export default CartPage;


