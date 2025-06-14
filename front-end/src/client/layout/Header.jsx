import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import './layout.css';
import '../assets/css/header.css';
import Sidebar from './Sidebar.jsx';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import { hasPermission } from '../services/AuthService.js';
import SearchBar from '../components/SearchBar.jsx';
import {useTranslation} from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigator = useNavigate();
  const { user, logout, token } = useAuth();
  const { updateCart } = useCart();
  const [cartTotal, setCartTotal] = useState(0);
  const [checkPermission, setCheckPermission] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".account-wrapper")) {
      setDropdownOpen(false);
    }
  };
  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
      setMobileMenu(false);
    }
  };

  useEffect(() => {
    if (mobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenu]);

  useEffect(() => {
    if (user && user.id) {
      setCheckPermission(hasPermission('ADMIN_PANEL'));
      axios.get(`${REST_API_BASE_URL}/carts/total-items/${user.id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
          .then(response => {
            setCartTotal(response.data);
            updateCart(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    } else {
      setCartTotal(0);
    }
  }, [user, updateCart, token]);

  useEffect(() => {
    if (!token) {
      return;
    }
    axios.get(`${REST_API_BASE_URL}/carts/my-cart`, {
      headers: { "Authorization": `Bearer ${token}` }
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
      headers: { "Authorization": `Bearer ${token}` }
    })
        .then(response => {
          updateCart(response.data.result);
        })
        .catch(error => {
          console.error("There was an error removing the cart item:", error);
        });
  };

  function getLogout() {
    setCheckPermission(false);
    logout();
    navigator(`/`);
  }

  function getHomePage() {
    navigator(`/`);
  }
  function getCart() {
    navigator(`/cart`);
  }
  const handleClick = () => {
    if (user) {
      navigator(`/`);
    } else {
      navigator(`/login`);
    }
  };
  function getProduct(id) {
    navigator(`/products/${id}`);
  }
  function getOrders() {
    navigator(`/orders`);
  }
  function getAdmin() {
    window.location.href = `/admin`;
  }
  function getProduct() {
    navigator(`/products`);
  }
// Hàm xử lý chuyển ngôn ngữ
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
        .then(() => {
          console.log(`Language changed to: ${lng}`); // Debug
          setIsOpen(false);
        })
        .catch((err) => {
          console.error('Error changing language:', err);
        });
  };
  return (
      <div>
        <header className="header header_menu">
          {mobileMenu && (
              <div id="mobile-menu" className="scroll active" ref={mobileMenuRef}>
                <div className="media d-flex user-menu">
                  <i className="fas fa-user-circle mr-3 align-self-center"/>
                  <div className="media-body d-md-flex flex-column ">
                    <a
                        rel="nofollow"
                        onClick={handleClick}
                        className="d-block"
                        title={t('account')}
                    >
                      {t('home.account')}
                    </a>
                    {user && (
                        <small>
                          <a
                              title={user.fullName}
                              className="font-weight-light"
                          >
                            {user.fullName}
                          </a>
                          &nbsp;&nbsp;
                          <a
                              onClick={getLogout}
                              title={user.fullName}
                              className="font-weight-light"
                          >
                            {t('home.logout')}
                          </a>
                        </small>
                    )}
                    {!user && (
                        <small>
                          <a
                              onClick={handleClick}
                              title={t('login')}
                              className="font-weight-light"
                          >
                            {t('home.login')}
                          </a>
                        </small>
                    )}
                  </div>
                </div>
                <Sidebar/>
                <div className="mobile-menu-footer border-top w-100 d-flex align-items-center text-center">
                  <div className="hotline w-50 p-2 ">
                    <a href="tel:19006760" title={t('call')}>
                      {t('home.call')} <i className="fas fa-phone ml-3"/>
                    </a>
                  </div>
                  <div className="messenger border-left p-2 w-50 border-left">
                    <a
                        href="https://www.messenger.com/t/100024390078063"
                        title={t('message')}
                    >
                      {t('home.message')}
                      <i className="fab fa-facebook-messenger ml-3"/>
                    </a>
                  </div>
                </div>
              </div>
          )}
          <div className="mid-header wid_100 d-flex align-items-center"
               style={{'--header-background': 'rgba(255,255,255,0.04)', '--header-color': '#1c1616'}}>
            <div className="container">
              <div className="row align-items-center position-relative">
                <div className='col-12 header-main'>
                  <div className='row align-items-center'>
                    <div className="col-4 d-lg-none menu-mobile">
                      <div onClick={toggleMobileMenu}
                           className="toggle-nav btn menu-bar mr-4 ml-0 p-0 d-lg-none d-flex text-white">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                      </div>
                    </div>
                    <div className='col-lg-3 col-4 logo-col'>
                      {location.pathname !== '/' && (
                          <div className="header-left">
                            <div className="subheader">
                              <div className="toogle-nav-wrapper">
                                <div className="icon-bar btn menu-bar mr-2 p-0 d-inline-flex">
                                  <span className="bar"/>
                                  <span className="bar"/>
                                  <span className="bar"/>
                                </div>
                                <div className="toogle-nav-focus-area"></div>
                                <div className="menu-wrapper" style={{top: 'calc(100%)'}}>
                                  <Sidebar/>
                                </div>
                              </div>
                              <div className="sticky-overlay"/>
                            </div>
                          </div>
                      )}
                      <a onClick={getHomePage} className="logo-wrapper" title={t('laptop')}>
                        <img loading="lazy" className="img-fluid"
                             src="https://res.cloudinary.com/dhqv00way/image/upload/v1748191585/analysis_ctgnha.png"
                             alt={t('laptop')}/>
                      </a> <strong style={{marginLeft: '10px'}}>LAPTOP</strong>
                    </div>
                    <SearchBar/>
                    <div className="col-4 col-lg-4 menu-cart">
                      <ul
                          className="header-right mb-0 list-unstyled d-flex align-items-center justify-content-end">
                        <li className="media d-lg-block d-none" style={{marginBottom: '10px'}}>
                          <div
                              className="language-dropdown-container"
                              onMouseEnter={() => setIsOpen(true)}
                              onMouseLeave={() => setIsOpen(false)}
                          >
                            <button className="dropbtn">
                              <div className="language-content">
                                {i18n.language === 'en' ? (
                                    <>
                                      <img
                                          src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                                          alt="US Flag"
                                          width="20"
                                          height="15"
                                      />
                                      <span className="language-text">English</span>
                                    </>
                                ) : (
                                    <>
                                      <img
                                          src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                                          alt="Vietnam Flag"
                                          width="20"
                                          height="15"
                                      />
                                      <span className="language-text">Tiếng Việt</span>
                                    </>
                                )}
                              </div>
                            </button>
                            {isOpen && (
                                <div className="language-dropdown">
                                  <div
                                      className="dropdown-item"
                                      onClick={() => changeLanguage('vi')} // Gọi hàm changeLanguage
                                      style={{cursor: 'pointer'}}
                                  >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                                        alt="Vietnam Flag"
                                        width="20"
                                        height="15"
                                    />{' '}
                                    Tiếng Việt
                                  </div>
                                  <div
                                      className="dropdown-item"
                                      onClick={() => changeLanguage('en')} // Gọi hàm changeLanguage
                                      style={{cursor: 'pointer'}}
                                  >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                                        alt="US Flag"
                                        width="20"
                                        height="15"
                                    />{' '}
                                    English
                                  </div>
                                </div>
                            )}
                          </div>
                        </li>

                        <li className='media d-lg-block d-none '>
                          <a onClick={() => navigator(`/store-address`)} className='d-block text-center'
                             title={t('store')}>
                            <img loading="lazy"
                                 src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/address-icon.png?1704435927037"
                                 width="24" height="24" className="align-self-center" alt="phone-icon"
                                 style={{filter: 'brightness(0) saturate(100%)'}}/>
                            <span className='d-none d-xl-block mt-1'>
                            {t('home.store')}
                          </span>
                          </a>
                        </li>
                        <li className='media d-lg-block d-none '>
                          <div className="account-wrapper">
                            <a
                                onClick={handleClick}
                                className='text-center d-block'
                                title={t('home.account')}
                            >
                              <img
                                  loading="lazy"
                                  src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/account-icon.png?1704435927037"
                                  width="24"
                                  height="24"
                                  alt="account_icon"
                                  className="align-self-center"
                                  style={{filter: 'brightness(0) saturate(100%)'}}
                              />
                              <span className='d-none d-xl-block mt-1'>{user ? user.fullName : t('account')}</span>
                            </a>
                            {user && (
                                <div className="account-dropdown">
                                  <button className="dropdown-item" onClick={() => navigator('/profile')}>
                                    {t('home.profile')}
                                  </button>
                                  <button className="dropdown-item" onClick={getOrders}>
                                    {t('home.orders')}
                                  </button>
                                  <button className="dropdown-item" onClick={getLogout}>
                                    {t('home.logout')}
                                  </button>
                                  {user.roles?.some(role => role.name === 'ADMIN') && (
                                      <button className="dropdown-item" onClick={getAdmin}>
                                        {t('home.admin')}
                                      </button>
                                  )}
                                </div>
                            )}
                          </div>
                        </li>
                        <li className="cartgroup">
                          <div className="mini-cart text-xs-center">
                            <a className="img_hover_cart d-block d-xl-flex flex-column align-items-center"
                               onClick={getCart} title={t('home.cart')}>
                              <div className="cart-icon">
                                <img loading="lazy"
                                     src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/cart-icon.png?1704435927037"
                                     width="24" height="24" alt="cart_icon"
                                     style={{filter: 'brightness(0) saturate(100%)'}}/>
                                <span className="count_item count_item_pr">{cartTotal}</span>
                              </div>
                              <span className='d-xl-block d-none mt-1'>{t('home.cart')}</span>
                            </a>
                            <div className="top-cart-content card ">
                              {cartItems.length > 0 ? (
                                  <ul id="cart-sidebar" className="mini-products-list count_li list-unstyled">
                                    <ul className="list-item-cart">
                                      {cartItems.map((item, index) => (
                                          <li key={index}>
                                            <div className="border_list">
                                              <div className="image_drop">
                                                <a className="product-image pos-relative embed-responsive embed-responsive-1by1"
                                                   onClick={() => getProduct(item.productEntity.id)}
                                                   title={item.productEntity.nameProduct}>
                                                  <img alt="Heavy Duty Paper Car"
                                                       src={item.productEntity.imageProductEntity[0].image}
                                                       width="100"/>
                                                </a>
                                              </div>
                                              <div className="detail-item">
                                                <div className="product-details">
                                            <span title="Xóa" onClick={() => deleteCartItem(item.id)}
                                                  className="remove-item-cart fa fa-times"></span>
                                                  <p className="product-name"><a
                                                      onClick={() => getProduct(item.productEntity.id)}
                                                      title={item.productEntity.nameProduct}>{item.productEntity.nameProduct}</a>
                                                  </p>
                                                </div>
                                                <span
                                                    className="variant-title">{item.productSize} / {item.productColor}</span>
                                                <div className="product-details-bottom">
                                            <span
                                                className="price">{parseInt(item.productEntity.sizeColorProductsEntity[0].discountPrice).toLocaleString('it-IT')}₫</span>
                                                  <span className="quanlity"> x {item.quantity}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                      ))}
                                    </ul>
                                    <div className="pd">
                                      <div className="top-subtotal">{t('temporary_total')}: <span
                                          className="price price_big">{parseInt(cart.totalPrice).toLocaleString('it-IT')}₫</span>
                                      </div>
                                    </div>
                                    <div className="pd right_ct"><a onClick={getCart}
                                                                    className="btn btn-white"><span>{t('proceed_checkout')}</span></a>
                                    </div>
                                  </ul>
                              ) : (
                                  <div className="no-item"><p>{t('no_items')}</p></div>
                              )}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-header d-lg-block d-none" style={{
            '--header-background': '#0074bf',
            '--header-color': '#ffffff'
          }}>
            <div className="container">
              <div className="navigation--horizontal d-md-flex align-items-center d-none">
                <div className=" navigation-horizontal-wrapper ">
                  <nav>
                    <ul className="navigation-horizontal list-group list-group-flush scroll">
                      <li className="menu-item list-group-item">
                        <a onClick={getHomePage} className="menu-item__link" title={t('home.home')}>
                          <span><strong>{t('home.home')}</strong></span>
                        </a>
                      </li>
                      <li className="menu-item list-group-item">
                        <a onClick={() => navigator(`/introduction`)} className="menu-item__link" title={t('about')}>
                          <span><strong>{t('home.about')}</strong></span>
                        </a>
                      </li>
                      <li className="menu-item list-group-item">
                        <a onClick={() => navigator(`/products`)} className="menu-item__link" title={t('home.promotion')}>
                          <span><strong>{t('home.promotion')}</strong></span>
                        </a>
                      </li>
                      <li className="menu-item list-group-item">
                        <a onClick={() => navigator(`/products`)} className="menu-item__link"
                           title={t('home.products')}>
                          <span><strong>{t('home.products')}</strong></span>
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </a>
                        <div className="submenu scroll default ">
                          <ul className="submenu__list">
                            <li className="submenu__item submenu__item--main">
                              <a className="link" onClick={() => navigator(`/products/Macbook`)}
                                 title={t('macbook')}>Macbook</a>
                            </li>
                            <li className="submenu__item submenu__item--main">
                              <a className="link" onClick={() => navigator(`/products/Dell`)}
                                 title={t('dell')}>Dell</a>
                            </li>
                            <li className="submenu__item submenu__item--main">
                              <a className="link" onClick={() => navigator(`/products/Hp`)}
                                 title={t('hp')}>Hp</a>
                            </li>
                            <li className="submenu__item submenu__item--main">
                              <a className="link" onClick={() => navigator(`/products/Asus`)}
                                 title={t('asus')}>Asus</a>
                            </li>
                            <li className="submenu__item submenu__item--main">
                              <a className="link" onClick={() => navigator(`/products/Acer`)}
                                 title={t('acer')}>Acer</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="menu-item list-group-item">
                        <a onClick={() => navigator(`/contact`)} className="menu-item__link" title={t('contact')}>
                          <span><strong>{t('home.contact')}</strong></span>
                        </a>
                      </li>
                      <li className="menu-item list-group-item">
                        <a href="/khuyen-mai" className="menu-item__link" title={t('gift')}>
                          <span><strong>{t('home.gift')}</strong></span>
                        </a>
                      </li>
                      <li className="menu-item list-group-item">
                        <a className="menu-item__link" title={t('feedback')}>
                          <span><strong>{t('home.feedback')}</strong></span>
                        </a>
                      </li>
                      <li className="menu-item list-group-item">
                        <a href="/khuyen-mai" className="menu-item__link" title={t('deal')}>
                          <span><strong>{t('home.deal')}</strong></span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

  );
};

export default Header;