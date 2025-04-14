import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import Breadcrumb from '../components/Breadcrumb.jsx';
import '../assets/css/RegisterPage.css';

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
        repassword: '',
        accountNameClass: '',
        emailClass: '',
        phoneClass: '',
        passwordClass: '',
        repasswordClass: ''
    });

    const [errors, setErrors] = useState({
        accountName: '',
        password: '',
        fullName: '',
        birthday: '',
        address: '',
        email: '',
        phone: '',
        repassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error message for the current field
        setErrors({
            ...errors,
            [name]: ''
        });

        let errorMessage = '';
        let validationClass = '';

        // Validate account name
        if (name === 'accountName' && value) {
            const accountNameRegex = /^[a-zA-Z0-9_]+$/;
            if (!accountNameRegex.test(value)) {
                errorMessage = 'Tên tài khoản không được chứa khoảng cách hoặc dấu.';
                validationClass = 'invalid'; // Thêm lớp invalid
            } else {
                validationClass = 'valid'; // Thêm lớp valid
            }
        }

        // Validate email
        if (name === 'email' && value) {
            const emailRegex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Email chưa đúng định dạng.';
                validationClass = 'invalid'; // Thêm lớp invalid
            } else {
                validationClass = 'valid'; // Thêm lớp valid
                axios.post(`${REST_API_BASE_URL}/account/checkEmail`, { email: value })
                    .then(response => {
                        if (response.data.code === 200) {
                            errorMessage = 'Email đã tồn tại.';
                            validationClass = 'invalid'; // Thêm lớp invalid
                        }
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            email: errorMessage
                        }));
                    }).catch(error => {
                    console.error("There was an error with the Axios operation:", error);
                });
            }
        }

        // Validate phone number
        if (name === 'phone' && value) {
            const phoneNumberRegex = /^\d{10}$/;
            if (!phoneNumberRegex.test(value)) {
                errorMessage = 'Số điện thoại phải có đúng 10 chữ số.';
                validationClass = 'invalid'; // Thêm lớp invalid
            } else {
                validationClass = 'valid'; // Thêm lớp valid
            }
        }

        // Validate password
        if (name === 'password' && value) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value)) {
                errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự gồm ít nhất 1 kí tự in hoa và 1 kí tự đặc biệt.';
                validationClass = 'invalid'; // Thêm lớp invalid
            } else {
                validationClass = 'valid'; // Thêm lớp valid
            }
        }

        // Validate repassword
        if (name === 'repassword' && value) {
            if (formData.password !== value) {
                errorMessage = 'Mật khẩu không trùng khớp.';
                validationClass = 'invalid'; // Thêm lớp invalid
            } else {
                validationClass = 'valid'; // Thêm lớp valid
            }
        }

        // Update error state and add validation class for the current field
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
        }));

        // Cập nhật class hợp lệ/không hợp lệ cho input
        setFormData(prevData => ({
            ...prevData,
            [name + "Class"]: validationClass
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if there are any errors
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
                                    className="btn-link-style btn-style margin-right-0"
                                >
                                    Đăng nhập tại đây
                                </a>
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 offset-md-3 py-3 mx-auto">
                                <div className="page-login py-3">
                                    <div id="login">
                                        <h2 className="text-center">Thông tin cá nhân</h2>
                                        <form onSubmit={handleSubmit} id="customer_register" acceptCharset="UTF-8">
                                            <div className="form-signup clearfix">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Tên tài khoản <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control form-control-lg ${formData.accountNameClass}`}
                                                                name="accountName"
                                                                id="accountName"
                                                                placeholder="Tên tài khoản"
                                                                value={formData.accountName}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.accountName && <span>{errors.accountName}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Họ tên <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className={`form-control form-control-lg ${formData.fullNameClass}`}
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
                                                                className={`form-control form-control-lg ${formData.birthdayClass}`}
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
                                                                className={`form-control form-control-lg ${formData.emailClass}`}
                                                                name="email"
                                                                id="email"
                                                                placeholder="Email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.email && <span>{errors.email}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Số điện thoại <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                className={`form-control form-control-lg ${formData.phoneClass}`}
                                                                name="phone"
                                                                id="phone"
                                                                placeholder="Số điện thoại"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.phone && <span>{errors.phone}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Mật khẩu <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className={`form-control form-control-lg ${formData.passwordClass}`}
                                                                name="password"
                                                                id="password"
                                                                placeholder="Mật khẩu"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.password && <span>{errors.password}</span>}
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <fieldset className="form-group">
                                                            <label>
                                                                Xác nhận mật khẩu <span className="required">*</span>
                                                            </label>
                                                            <input
                                                                type="password"
                                                                className={`form-control form-control-lg ${formData.repasswordClass}`}
                                                                name="repassword"
                                                                id="repassword"
                                                                placeholder="Xác nhận mật khẩu"
                                                                value={formData.repassword}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.repassword && <span>{errors.repassword}</span>}
                                                        </fieldset>
                                                    </div>
                                                </div>
                                                <div className="form-submit text-center">
                                                    <button type="submit" className="btn btn-primary btn-lg">
                                                        Đăng ký
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterPage;
