import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import '../assets/css/LoginPage.css';

const LoginPage = () => {
    const { login } = useAuth();
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = /.{8,}/;
        const hasUpperCase = /[A-Z]/;
        const hasNumber = /[0-9]/;

        if (!minLength.test(password)) {
            return 'Mật khẩu phải có ít nhất 8 ký tự.';
        }
        if (!hasUpperCase.test(password)) {
            return 'Mật khẩu phải có ít nhất 1 chữ cái viết hoa.';
        }
        if (!hasNumber.test(password)) {
            return 'Mật khẩu phải có ít nhất 1 chữ số.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            setPasswordError(passwordValidation);
            return;
        }

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

    const getRegisterPage = () => navigate('/register');
    const getForgotPasswordPage = () => navigate('/forgot-password');

    const handleFacebookLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/facebook`;
    };

    const handleGoogleLogin = () => {
        window.location.href = `${REST_API_BASE_URL}/oauth2/authorization/google`;
    };

    const isPasswordValid = passwordError === '' && password.length > 0;
    const isAccountNameValid = accountName.trim().length > 0;

    return (
        <>
            <Breadcrumb page={'Đăng nhập'} />
            <section className="section">
                <div style={{ borderRadius: '20px' }} className="container margin-bottom-20 card py-20">
                    <div className="wrap_background_aside margin-bottom-40 page_login">
                        <div className="heading-bar text-center">
                            <h1 className="title_page mb-0">Đăng nhập tài khoản</h1>
                            <p className="mb-0">
                                Bạn chưa có tài khoản ?{' '}
                                <a onClick={getRegisterPage} className="btn-link-style btn-register" style={{ textDecoration: 'underline' }}>
                                    Đăng ký tại đây
                                </a>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 offset-md-3 py-3 mx-auto">
                                <div className="page-login">
                                    <div id="login">
                                        <form id="customer_login" acceptCharset="UTF-8" onSubmit={handleSubmit}>
                                            <div className="form-signup clearfix">
                                                <fieldset className="form-group">
                                                    <label className={accountName.length > 0 && !isAccountNameValid ? 'label-error' : ''}>
                                                        Tài khoản <span className="required">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`input-default ${
                                                            accountName.length === 0
                                                                ? ''
                                                                : isAccountNameValid
                                                                    ? 'input-valid'
                                                                    : 'input-error'
                                                        }`}
                                                        placeholder="Tài khoản"
                                                        required
                                                        value={accountName}
                                                        onChange={(e) => setAccountName(e.target.value)}
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label className={passwordError ? 'label-error' : ''}>
                                                        Mật khẩu <span className="required">*</span>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className={`input-default ${
                                                            password.length === 0
                                                                ? ''
                                                                : isPasswordValid
                                                                    ? 'input-valid'
                                                                    : 'input-error'
                                                        }`}
                                                        placeholder="Mật khẩu"
                                                        required
                                                        value={password}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            setPassword(value);
                                                            const error = validatePassword(value);
                                                            setPasswordError(error);
                                                        }}
                                                    />
                                                    {passwordError && (
                                                        <div className="error-message">{passwordError}</div>
                                                    )}
                                                    <small className="d-block my-2">
                                                        Quên mật khẩu? Nhấn vào
                                                        <a onClick={getForgotPasswordPage} className="btn-link-style text-primary">
                                                            {' '}
                                                            đây{' '}
                                                        </a>
                                                    </small>
                                                </fieldset>
                                                <div className="pull-xs-left button_bottom a-center mb-3">
                                                    <button className="btn btn-block btn-style btn-login" type="submit">
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
                                    <a onClick={handleFacebookLogin} className="social-login--facebook">
                                        <img
                                            style={{ marginRight: '5px', borderRadius: '5px' }}
                                            width="129px"
                                            height="37px"
                                            alt="facebook-login-button"
                                            src="//bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
                                        />
                                    </a>
                                    <a onClick={handleGoogleLogin} className="social-login--google">
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
