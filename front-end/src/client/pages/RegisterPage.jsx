import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService.js';


const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        accountName: '',
        password: '',
        fullName: '',
        birthday: '',
        address: '',
        email: '',
        phone: '',
        repassword: ''
    });

    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(errors).some(error => error !== '');
        if (hasErrors) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng sửa tất cả các lỗi trước khi đăng ký.'
            });
            return;
        }

        const { repassword, ...dataToSubmit } = formData;
        console.log('Data to submit:', dataToSubmit);

        axios.post(`${REST_API_BASE_URL}/account/register`, dataToSubmit)
            .then(response => {
                // Hiển thị SweetAlert2 để yêu cầu người dùng nhập mã xác thực
                Swal.fire({
                    title: 'Nhập mã xác thực',
                    html: `<p style="font-size: 15px;">Chúng tôi đã gửi mã xác thực vào email: ${formData.email}.</p>`,
                    input: 'text',
                    inputPlaceholder: 'Nhập mã bạn nhận được',
                    showCancelButton: true,
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Hủy',
                    preConfirm: (verificationCode) => {
                        if (!verificationCode) {
                            Swal.showValidationMessage('Bạn cần nhập mã xác thực');
                        }
                        return verificationCode;
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const verificationCode = result.value;
                        // Gửi mã xác thực đến máy chủ để kiểm tra
                        axios.post(`${REST_API_BASE_URL}/account/checkEmail`, { verificationCode })
                            .then(verifyResponse => {
                                if (verifyResponse.data.code === 200) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Đăng ký thành công',
                                        text: 'Tài khoản của bạn đã được xác thực!'
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Mã xác thực không đúng',
                                        text: 'Vui lòng thử lại.'
                                    });
                                }
                            })
                            .catch(verifyError => {
                                console.error('Error verifying code:', verifyError);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Có lỗi xảy ra',
                                    text: 'Vui lòng thử lại sau.'
                                });
                            });
                    }
                });
            })
            .catch(error => {
                console.error('Có lỗi xảy ra:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký thất bại',
                    text: 'Vui lòng thử lại.'
                });
            });
    };

    function getLoginPage() {
        navigate('/login');
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';

        if (name === 'accountName') {
            const accountNameRegex = /^[a-zA-Z0-9_]+$/;
            if (!accountNameRegex.test(value) && value !== null && value !== '') {
                errorMessage = 'Tên tài khoản không được chứa khoảng cách hoặc dấu.';
            }
        }

        if (name === 'email') {
            const emailNameRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailNameRegex.test(value) && value !== null && value !== '') {
                errorMessage = 'Email chưa đúng định dạng user@acb.zxc.';
            } else {
                axios.post('http://localhost:8080/sugarnest/v0.1/account/checkEmail', { email: formData.email })
                    .then(response => {
                        if (response.data.code === 200) {
                            console.log('Email exists:', formData.email);
                            errorMessage = 'Email đã tồn tại.';
                        } else {
                            console.log('Email does not exist:', formData.email);
                            console.log(response);
                        }
                        setErrors({
                            ...errors,
                            [name]: errorMessage
                        });
                    }).catch(error => {
                        console.error("There was an error with the Axios operation:", error);
                    });
                return;
            }
        }

        if (name === 'phone') {
            const phoneNumberRegex = /^\d{10}$/;
            if (!phoneNumberRegex.test(value) && value !== null && value !== '') {
                errorMessage = 'Số điện thoại phải có đúng 10 chữ số.';
            }
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value) && value !== null && value !== '') {
                errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự gồm ít nhất 1 kí tự in hoa và 1 kí tự đặc biệt.';
            }
        }


        if (name === 'repassword' && value !== null && value !== '') {
            if (formData.password !== formData.repassword) {
                errorMessage = 'Mật khẩu không trùng khớp.';
            }
        }

        setErrors({
            ...errors,
            [name]: errorMessage
        });
    };
    const handleFacebookLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/facebook`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/google`;
    };
    return (
        <>
            <Breadcrumb page={'Đăng ký'} />
            <section className="section">
                <div style={{ borderRadius: '20px' }} className="container margin-bottom-20 card py-2">
                    <div className="wrap_background_aside margin-bottom-40 page_login">
                        <div className="heading-bar text-center">
                            <h1 className="title_page mb-0">Đăng ký tài khoản</h1>
                            <span className="or">
                                Bạn đã có tài khoản ?{" "}
                                <a
                                    onClick={getLoginPage}
                                    style={{ textDecoration: "underline" }}
                                    className="btn-link-style  btn-style margin-right-0"
                                >
                                    Đăng nhập tại đây
                                </a>
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 offset-md-3 py-3 mx-auto">
                                <div className="page-login py-3 ">
                                    <div id="login">
                                        <h2 className="text-center">Thông tin cá nhân</h2>
                                        <form onSubmit={handleSubmit} id="customer_register" acceptCharset="UTF-8">
                                            <div className="form-signup " style={{ color: "red" }}></div>
                                            <div className="form-signup clearfix">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Tên tài khoản <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg"
                                                                name="accountName"
                                                                id="accountName"
                                                                placeholder="Tên tài khoản"
                                                                value={formData.accountName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            {errors.accountName && <span style={{ color: 'red' }}>{errors.accountName}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Họ tên <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg"
                                                                name="fullName"
                                                                id="fullName"
                                                                placeholder="Họ tên"
                                                                value={formData.fullName}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Ngày tháng năm sinh <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="birthday"
                                                                className="form-control form-control-comment form-control-lg"
                                                                name="birthday"
                                                                value={formData.birthday}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Email <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control form-control-lg"
                                                                name="email"
                                                                id="email"
                                                                placeholder="Email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Số điện thoại <span className="required">*</span>{" "}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg"
                                                                name="phone"
                                                                id="phone"
                                                                placeholder="Số điện thoại"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Địa chỉ <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg"
                                                                name="address"
                                                                id="address"
                                                                placeholder="Địa chỉ"
                                                                value={formData.address}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Mật khẩu <span className="required">*</span>{" "}
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="form-control form-control-lg"
                                                                name="password"
                                                                id="password"
                                                                placeholder="Mật khẩu"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Nhập lại mật khẩu <span className="required">*</span>{" "}
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className="form-control form-control-lg"
                                                                name="repassword"
                                                                id="repassword"
                                                                placeholder="Nhập lại mật khẩu"
                                                                value={formData.repassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                            />
                                                            {errors.repassword && <span style={{ color: 'red' }}>{errors.repassword}</span>}
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div className="section margin-top-10 button_bottom mt-3">
                                                    <button
                                                        type="submit"
                                                        value="Đăng ký"
                                                        className="btn  btn-style  btn_register btn-block"
                                                    >
                                                        Đăng ký
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

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
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterPage