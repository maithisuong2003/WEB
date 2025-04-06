import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { REST_API_BASE_URL } from '../services/ProductService.js';

const LoginPage = () => {
    const { login } = useAuth();
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginSuccess = await login(accountName, password);
            if (!loginSuccess) {
                setError('Đăng nhập thất bại. Vui lòng thử lại.');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    function getRegisterPage() {
        navigate('/register')
    }
    function getForgotPasswordPage() {
        navigate('/forgot-password')
    }
    const handleFacebookLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/facebook`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/google`;
    };

    return (
        <>
            <Breadcrumb page={'Đăng nhập'} />
            <section className="section">
                <div style={{ borderRadius: '20px' }} className="container margin-bottom-20 card py-20">
                    <div className="wrap_background_aside margin-bottom-40 page_login">
                        <div className="heading-bar text-center">
                            <h1 className="title_page mb-0">Đăng nhập tài khoản</h1>
                            <p className="mb-0">
                                Bạn chưa có tài khoản ?{" "}
                                <a
                                    onClick={getRegisterPage}
                                    className="btn-link-style btn-register"
                                    style={{ textDecoration: "underline" }}
                                >
                                    Đăng ký tại đây
                                </a>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 offset-md-3 py-3 mx-auto">
                                <div className="page-login ">
                                    <div id="login">
                                        <form
                                            method="post"
                                            action="/account/login"
                                            id="customer_login"
                                            acceptCharset="UTF-8"
                                            onSubmit={handleSubmit}
                                        >
                                            <input
                                                name="FormType"
                                                type="hidden"
                                            />
                                            <input name="utf8" type="hidden" />
                                            <div
                                                className="form-signup margin-bottom-15"
                                                style={{ color: "red" }}
                                            ></div>
                                            <div className="form-signup clearfix">
                                                <fieldset className="form-group">
                                                    <label>
                                                        Tài khoản <span className="required">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        name="email"
                                                        id="customer_email"
                                                        placeholder="Tài khoản"
                                                        required
                                                        fdprocessedid="coizbj"

                                                        value={accountName} onChange={(e) => setAccountName(e.target.value)}
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>
                                                        Mật khẩu <span className="required">*</span>{" "}
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control "
                                                        name="password"
                                                        id="customer_password"
                                                        placeholder="Mật khẩu"
                                                        required
                                                        fdprocessedid="8vtuo5"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <small className="d-block my-2">
                                                        Quên mật khẩu? Nhấn vào
                                                        <a
                                                            onClick={getForgotPasswordPage}
                                                            className="btn-link-style text-primary"
                                                        >
                                                            {" "}
                                                            đây{" "}
                                                        </a>
                                                    </small>
                                                </fieldset>
                                                <div className="pull-xs-left button_bottom a-center  mb-3">
                                                    <button
                                                        className="btn btn-block btn-style  btn-login"
                                                        type="submit"
                                                        value="Đăng nhập"
                                                        fdprocessedid="ocavj"
                                                    >
                                                        Đăng nhập
                                                    </button>
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="block social-login--facebooks margin-top-20 text-center">
                                    <p className="a-center text-secondary">Hoặc đăng nhập bằng</p>
                                    <a
                                        onClick={handleFacebookLogin}
                                        className="social-login--facebook"
                                    >
                                        <img
                                            style={{ marginRight: '5px', borderRadius: '5px' }}
                                            width="129px"
                                            height="37px"
                                            alt="facebook-login-button"
                                            src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                                        />
                                    </a>
                                    <a
                                        onClick={handleGoogleLogin}
                                        className="social-login--google"
                                    >
                                        <img
                                            style={{ marginLeft: '5px', borderRadius: '5px' }}
                                            width="129px"
                                            height="37px"
                                            alt="google-login-button"
                                            src="//bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;