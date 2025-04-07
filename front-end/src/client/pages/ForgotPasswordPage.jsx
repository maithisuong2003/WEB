import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService.js';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${REST_API_BASE_URL}/email/send_reset_password_email`, { accountEmail: email })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            Swal.fire('Thành công', 'Email khôi phục mật khẩu đã được gửi', 'success');
        } catch (error) {
            Swal.fire('Thành công', 'Email khôi phục mật khẩu đã được gửi', 'success');
        }
    };

    const handleFacebookLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/facebook`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/google`;
    };

    return (
        <section className="section">
            <div className="container margin-bottom-20 card py-20">
                <div className="wrap_background_aside margin-bottom-40 page_login">
                    <div className="heading-bar text-center">
                        <h1 className="title_page mb-0">Đăng nhập tài khoản</h1>
                        <p className="mb-0">
                            Bạn chưa có tài khoản ?
                            <a
                                onClick={() => navigate('/register')}
                                className="btn-link-style btn-register"
                                style={{ textDecoration: "underline" }}
                            >
                                {" "}
                                Đăng ký tại đây
                            </a>
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-5 offset-md-3 py-3 mx-auto">
                            <div className="page-login ">
                                <div id="recover-password" style={{ display: "block" }} className="form-signup page-login text-center">
                                    <h2>Đặt lại mật khẩu</h2>
                                    <p>
                                        Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.
                                    </p>
                                    <form onSubmit={handleSubmit} id="recover_customer_password" acceptCharset="UTF-8">
                                        <div className="form-signup" style={{ color: "red" }}></div>
                                        <div className="form-signup clearfix">
                                            <fieldset className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email"
                                                    required
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="action_bottom my-3">
                                            <button className="btn btn-style btn-recover btn-block" type="submit">
                                                Lấy lại mật khẩu
                                            </button>
                                            <a className="btn btn-style link btn-style-active" onClick={() => navigate('/login')}>
                                                Quay lại
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="block social-login--facebooks margin-top-20 text-center">
                                <p className="a-center text-secondary">Hoặc đăng nhập bằng</p>
                                <a onClick={handleFacebookLogin} className="social-login--facebook">
                                    <img style={{ marginRight: '5px', borderRadius: '5px' }} width="129px" height="37px" alt="facebook-login-button" src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" />
                                </a>
                                <a onClick={handleGoogleLogin} className="social-login--google">
                                    <img style={{ marginLeft: '5px', borderRadius: '5px' }} width="129px" height="37px" alt="google-login-button" src="//bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPasswordPage;
