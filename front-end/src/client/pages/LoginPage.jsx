import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import '../assets/css/LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const { login } = useAuth();
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [accountNameError, setAccountNameError] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        if (accountName.trim() === '') {
            setAccountNameError('Vui lòng điền vào mục này ');
            hasError = true;
        }
        if (password.trim() === '') {
            setPasswordError('Vui lòng điền vào mục này');
            hasError = true;
        }
        if (hasError) return;

        try {
            const loginSuccess = await login(accountName, password);
            if (!loginSuccess) {
                setError('Đăng nhập thất bại. Vui lòng thử lại');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Đăng nhập thất bại. Vui lòng thử lại');
        }
    };

    const getRegisterPage = () => navigate('/register');
    const getForgotPasswordPage = () => navigate('/forgot-password');

    const handleFacebookLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/facebook`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/google`;
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Đăng nhập</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className={`input-default ${accountNameError ? 'input-error' : ''}`}
                        placeholder={"Tên tài khoản"}
                        value={accountName}
                        onChange={(e) => {
                            const value = e.target.value;
                            setAccountName(value);
                            if (value.trim() === '') {
                                setAccountNameError('Vui lòng điền vào mục này');
                            } else {
                                setAccountNameError('');
                            }
                        }}
                        onBlur={() => {
                            if (accountName.trim() === '') {
                                setAccountNameError('Vui lòng điền vào mục này');
                            }
                        }}
                    />
                    <div className={`error-message ${accountNameError ? 'visible' : ''}`}>
                        {accountNameError || ' '}
                    </div>

                    <div style={{position: 'relative'}}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`input-default ${passwordError ? 'input-error' : ''}`}
                            value={password}
                            placeholder={"Mật khẩu"}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPassword(value);
                                if (value.trim() === '') {
                                    setPasswordError('Vui lòng điền vào mục này');
                                } else {
                                    setPasswordError('');
                                }
                            }}
                            onBlur={() => {
                                if (password.trim() === '') {
                                    setPasswordError('Vui lòng điền vào mục này');
                                }
                            }}
                            style={{paddingRight: '40px'}}
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '40%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: '#666',
                                fontSize: '18px'
                            }}
                        />
                    </div>
                    <div className={`error-message ${passwordError ? 'visible' : ''}`}>
                        {passwordError || ' '}
                    </div>
                    <button type="submit">Đăng nhập</button>
                    <div className="login-error-message">
                        {error || ' '}
                    </div>

                    <div>
                        <small className="forgot-password-text">
                            <a onClick={getForgotPasswordPage} className="btn-link-style text-primary">
                                Quên mật khẩu?
                            </a>
                        </small>
                    </div>
                </form>

                <div className="or-separator">
                    <span>Hoặc</span>
                </div>

                <div
                    className="block social-login--facebooks text-center"
                    style={{marginBottom: '25px'}}
                >
                    <button onClick={handleFacebookLogin} className="social-btn">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                            alt="Facebook"
                        />
                        Facebook
                    </button>
                    <button
                        onClick={handleGoogleLogin}
                        className="social-btn"
                        style={{ marginLeft: '10px' }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                            alt="Google"
                        />
                        Google
                    </button>
                </div>

                <p className="register-text">
                    Bạn chưa có tài khoản?
                    <a onClick={getRegisterPage} className="btn-link-style btn-register"
                       style={{ textDecoration: 'underline' }}>
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
