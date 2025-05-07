import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService';
import '../assets/css/ResetPasswordPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);
    const [errors, setErrors] = useState({
        password: '',
        repassword: ''
    });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
            setPassword(value);

            if (!value.trim()) {
                setErrors(prev => ({ ...prev, password: 'Vui lòng điền vào mục này' }));
            } else if (!passwordRegex.test(value)) {
                setErrors(prev => ({ ...prev, password: 'Mật khẩu phải có ít nhất 8 kí tự, gồm ít nhất 1 chữ in hoa, 1 số và 1 kí tự đặc biệt.' }));
            } else {
                setErrors(prev => ({ ...prev, password: '' }));
            }

            if (confirmPassword && value !== confirmPassword) {
                setErrors(prev => ({ ...prev, repassword: 'Mật khẩu không trùng khớp.' }));
            } else if (confirmPassword) {
                setErrors(prev => ({ ...prev, repassword: '' }));
            }

        } else if (name === 'repassword') {
            setConfirmPassword(value);

            if (!value.trim()) {
                setErrors(prev => ({ ...prev, repassword: 'Vui lòng điền vào mục này' }));
            } else if (value !== password) {
                setErrors(prev => ({ ...prev, repassword: 'Mật khẩu không trùng khớp.' }));
            } else {
                setErrors(prev => ({ ...prev, repassword: '' }));
            }
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!password.trim()) {
            setErrors(prev => ({ ...prev, password: 'Vui lòng điền vào mục này' }));
            return;
        }
        if (!confirmPassword.trim()) {
            setErrors(prev => ({ ...prev, repassword: 'Vui lòng điền vào mục này' }));
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrors(prev => ({ ...prev, password: 'Mật khẩu phải có ít nhất 8 kí tự, gồm ít nhất 1 chữ in hoa, 1 số và 1 kí tự đặc biệt.' }));
            return;
        }
        if (password !== confirmPassword) {
            setErrors(prev => ({ ...prev, repassword: 'Mật khẩu không trùng khớp.' }));
            return;
        }

        try {
            const response = await axios.put(`${REST_API_BASE_URL}/account/resetPassword`, {
                token,
                newPassword: password
            });

            if (response.data.code === 200) {
                Swal.fire('Thành công', 'Đặt lại mật khẩu thành công!', 'success');
                navigate('/login');
            } else {
                Swal.fire('Lỗi', 'Đặt lại mật khẩu thất bại.', 'error');
            }
        } catch (error) {
            Swal.fire('Lỗi', 'Đặt lại mật khẩu thất bại.', 'error');
        }
    };

    return (
        <div className="login-container">
            <div className="reset-card">
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <span
                        onClick={() => navigate('/login')}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#19b0ab',
                            fontSize: '35px',
                        }}
                    >
                        &#8592;
                    </span>
                    <h2 className="login-title" style={{ margin: 0, textAlign: 'center' }}>
                        Đặt lại mật khẩu
                    </h2>
                </div>

                <form className="login-form" onSubmit={handleResetPassword}>
                    <div className="form-group password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input-default"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={() => {
                                if (!password.trim()) {
                                    setErrors(prev => ({ ...prev, password: 'Vui lòng điền vào mục này' }));
                                } else if (!passwordRegex.test(password)) {
                                    setErrors(prev => ({ ...prev, password: 'Mật khẩu phải có ít nhất 8 kí tự, gồm ít nhất 1 chữ in hoa, 1 số và 1 kí tự đặc biệt.' }));
                                } else {
                                    setErrors(prev => ({ ...prev, password: '' }));
                                }

                                if (confirmPassword && password !== confirmPassword) {
                                    setErrors(prev => ({ ...prev, repassword: 'Mật khẩu không trùng khớp.' }));
                                } else if (confirmPassword) {
                                    setErrors(prev => ({ ...prev, repassword: '' }));
                                }
                            }}
                            placeholder="Mật khẩu mới"
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            className="eye-icon"
                            style={{ top: '30%' }}
                        />
                        <div className={`error-message ${errors.password ? 'visible' : ''}`}>
                            {errors.password || ' '}
                        </div>
                    </div>

                    <div className="form-group password-field">
                        <input
                            type={showRepassword ? 'text' : 'password'}
                            className="input-default"
                            name="repassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            onBlur={() => {
                                if (!confirmPassword.trim()) {
                                    setErrors(prev => ({ ...prev, repassword: 'Vui lòng điền vào mục này' }));
                                } else if (confirmPassword !== password) {
                                    setErrors(prev => ({ ...prev, repassword: 'Mật khẩu không trùng khớp.' }));
                                } else {
                                    setErrors(prev => ({ ...prev, repassword: '' }));
                                }
                            }}
                            placeholder="Xác nhận mật khẩu"
                            required
                        />
                        <FontAwesomeIcon
                            icon={showRepassword ? faEyeSlash : faEye}
                            onClick={() => setShowRepassword(!showRepassword)}
                            className="eye-icon"
                            style={{ top: '30%' }}
                        />
                        <div className={`error-message ${errors.repassword ? 'visible' : ''}`}>
                            {errors.repassword || ' '}
                        </div>
                    </div>

                    <button type="submit">Đổi mật khẩu</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
