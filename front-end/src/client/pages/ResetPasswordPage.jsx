import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }
    
        try {
            const response = await axios.put(`${REST_API_BASE_URL}/account/resetPassword`, {
                token,
                newPassword: password
            });
    
            if (response.data.code === 200) {
                Swal.fire('Success', 'Password has been reset successfully', 'success');
                navigate('/login');
            } else {
                Swal.fire('Error', 'Failed to reset password', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to reset password', 'error');
        }
    };
    

    return (
        <section className="section">
            <div className="container margin-bottom-20 card py-20">
                <div className="wrap_background_aside margin-bottom-40 page_login">
                    <div className="heading-bar text-center">
                        <h1 className="title_page mb-0">Đặt lại mật khẩu</h1>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-5 offset-md-3 py-3 mx-auto">
                            <div className="page-login ">
                                <div id="reset-password" className="form-signup page-login text-center">
                                    <h2>Đặt lại mật khẩu</h2>
                                    <form onSubmit={handleResetPassword} acceptCharset="UTF-8">
                                        <div className="form-signup clearfix">
                                            <fieldset className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Mật khẩu mới"
                                                    required
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Xác nhận mật khẩu"
                                                    required
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="action_bottom my-3">
                                            <button className="btn btn-style btn-recover btn-block" type="submit">
                                                Đổi mật khẩu
                                            </button>
                                            <a className="btn btn-style link btn-style-active" onClick={() => navigate('/login')}>
                                                Quay lại
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
