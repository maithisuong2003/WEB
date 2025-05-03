import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Swal from "sweetalert2";
import {REST_API_BASE_URL} from "../services/ProductService.js";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;

        let errorMessage = '';
        let validationClass = '';

        // Nếu người dùng đang xoá hết nội dung
        if (!value.trim()) {
            errorMessage = 'Vui lòng điền vào mục này';
            validationClass = 'invalid';
        } else {
            // Validate theo từng trường
            switch (name) {
                case 'accountName': {
                    const accountNameRegex = /^[a-zA-Z0-9_]+$/;
                    if (!accountNameRegex.test(value)) {
                        errorMessage = 'Tên tài khoản không được chứa khoảng cách hoặc dấu.';
                        validationClass = 'invalid';
                    } else {
                        validationClass = 'valid';
                    }
                    break;
                }
                case 'email': {
                    const emailRegex = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Email chưa đúng định dạng.';
                        validationClass = 'invalid';
                    } else {
                        validationClass = 'valid';
                        // Kiểm tra trùng email
                        axios.post(`${REST_API_BASE_URL}/account/checkEmail`, { email: value })
                            .then(response => {
                                if (response.data.code === 200) {
                                    setErrors(prevErrors => ({
                                        ...prevErrors,
                                        email: 'Email đã tồn tại.'
                                    }));
                                }
                            }).catch(error => {
                            console.error("Lỗi khi kiểm tra email:", error);
                        });
                    }
                    break;
                }
                case 'phone': {
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(value)) {
                        errorMessage = 'Số điện thoại phải có đúng 10 chữ số.';
                        validationClass = 'invalid';
                    } else {
                        validationClass = 'valid';
                    }
                    break;
                }
                case 'password': {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!passwordRegex.test(value)) {
                        errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự gồm ít nhất 1 kí tự in hoa và 1 kí tự đặc biệt.';
                        validationClass = 'invalid';
                    } else {
                        validationClass = 'valid';
                    }
                    break;
                }
                case 'repassword': {
                    if (value !== formData.password) {
                        errorMessage = 'Mật khẩu không trùng khớp.';
                        validationClass = 'invalid';
                    } else {
                        validationClass = 'valid';
                    }
                    break;
                }
                default:
                    validationClass = 'valid';
            }
        }

        // Cập nhật formData và lỗi
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            [name + "Class"]: validationClass
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
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

                        // ✅ Gửi cả email và mã xác thực về backend
                        axios.post(`${REST_API_BASE_URL}/email/verify_code`, {
                            email: formData.email,
                            verificationCode: verificationCode
                        })
                            .then(verifyResponse => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Đăng ký thành công',
                                    text: 'Tài khoản của bạn đã được xác thực!'
                                });
                            })
                            .catch(verifyError => {
                                console.error('Error verifying code:', verifyError);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Mã xác thực không đúng',
                                    text: 'Vui lòng thử lại.'
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
    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: 'Vui lòng điền vào mục này'
            }));

            setFormData(prevData => ({
                ...prevData,
                [name + "Class"]: 'invalid'
            }));
        }
    };

    function getLoginPage() {
        navigate('/login');
    }
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Đăng ký</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="accountName"
                        placeholder="Tên tài khoản"
                        value={formData.accountName}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    <div className={`error-message ${errors.accountName ? 'visible' : ''}`}>
                        {errors.accountName || ' '}
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Họ tên"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={`error-message ${errors.fullName ? 'visible' : ''}`}>
                        {errors.fullName || ' '}
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <div className={`error-message ${errors.email ? 'visible' : ''}`}>
                        {errors.email || ' '}
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    <div className={`error-message ${errors.birthday ? 'visible' : ''}`}>
                        {errors.birthday || ' '}
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <div className={`error-message ${errors.phone ? 'visible' : ''}`}>
                        {errors.phone || ' '}
                    </div>
                </div>

                <div className="form-group password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className="eye-icon"
                        style={{top:"40%"}}
                    />
                    <div className={`error-message ${errors.password ? 'visible' : ''}`}>
                        {errors.password || ' '}
                    </div>
                </div>

                <div className="form-group password-field">
                    <input
                        type={showRepassword ? 'text' : 'password'}
                        name="repassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.repassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <FontAwesomeIcon
                        icon={showRepassword ? faEyeSlash : faEye}
                        onClick={() => setShowRepassword(!showRepassword)}
                        className="eye-icon"
                        style={{top:"40%"}}
                    />
                    <div className={`error-message ${errors.repassword ? 'visible' : ''}`}>
                        {errors.repassword || ' '}
                    </div>
                </div>

                <button type="submit">Đăng ký</button>

                <p className="register-text">
                    Bạn đã có tài khoản?{' '}
                    <a
                        onClick={getLoginPage}
                        style={{textDecoration: "underline"}}
                        className="btn-link-style btn-style margin-right-0"
                    >
                        Đăng nhập
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
