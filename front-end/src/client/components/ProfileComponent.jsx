import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.jsx';
import SidebarAccount from '../layout/SidebarAccount.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService.js';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate('/login');
  }
  const [activeSection, setActiveSection] = useState('accountInfo');
  const account = user || {};
  const [showForm, setShowForm] = useState(false);
  const [updatedAccount, setUpdatedAccount] = useState({
    fullName: account.fullName,
    phone: account.phone,
    email: account.email,
    birthday: account.birthday ? account.birthday.split('T')[0] : '',
    address: account.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount({
      ...updatedAccount,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${REST_API_BASE_URL}/account/edit`,
        updatedAccount,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (response.data.code === 200) {
        setShowForm(false);
        account.address = updatedAccount.address;
        account.fullName = updatedAccount.fullName;
        account.phone = updatedAccount.phone;
        account.birthday = updatedAccount.birthday;
        Swal.fire('Thành công!', 'Tài khoản đã được cập nhật.', 'success');
      } else {
        console.error('Failed to update account');
        Swal.fire('Lỗi!', 'Không thể cập nhật tài khoản.', 'error');
      }
    } catch (error) {
      setShowForm(false);
      console.error('Error updating account', error);
      Swal.fire('Lỗi!', 'Không thể cập nhật tài khoản.', 'error');
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = passwordData;

    if (newPassword !== confirmNewPassword) {
      Swal.fire('Lỗi!', 'Mật khẩu mới và xác nhận mật khẩu mới không khớp.', 'error');
      return;
    }

    try {
      const response = await axios.put(
        `${REST_API_BASE_URL}/account/edit/password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      if (response.data.code === 200) {
        Swal.fire('Thành công!', 'Mật khẩu đã được cập nhật.', 'success');
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } else {
        Swal.fire('Lỗi!', 'Không thể cập nhật mật khẩu.', 'error');
      }
    } catch (error) {
      Swal.fire('Lỗi!', 'Mật khẩu củ không đúng.', 'error');
    }
  };

  return (
    <>
      <Breadcrumb page={'Đăng nhập'} />
      <section className="signup page_customer_account section">
        <div className="container card p-3" style={{ height: '450px' }}>
          <div className="row">
            <SidebarAccount user={account} activeSection={activeSection} setActiveSection={setActiveSection} />
            {activeSection === 'accountInfo' && (
              <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                <h1 className="title-head margin-top-0">Thông tin tài khoản</h1>
                <div className="form-signup name-account m992">
                  <p>
                    <strong>Họ tên:</strong> {account.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {account.email}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {account.phone}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong> {updatedAccount.birthday}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {account.address}
                  </p>

                  <div className={`op_address ${showForm ? 'opened' : ''}`}></div>
                  <p className="btn-row">
                    <button
                      className="btn-edit-addr btn btn-primary btn-more"
                      type="button"
                      onClick={toggleForm}
                    >
                      Cập nhật thông tin
                    </button>
                  </p>
                </div>
                {showForm && (
                  <div id="add_address" className="form-list modal_address" style={{ height: 400, display: 'block' }}>
                    <div className="btn-close closed_pop" onClick={toggleForm}>
                      <i className="fa fa-times" />
                    </div>
                    <h2 className="title_pop">Cập nhật thông tin</h2>
                    <form onSubmit={handleSave} acceptCharset="UTF-8">
                      <input name="FormType" type="hidden" defaultValue="customer_address" />
                      <input name="utf8" type="hidden" defaultValue="true" />
                      <div className="pop_bottom">
                        <div className="form_address">
                          <div className="field">
                            <fieldset className="form-group">
                              <input
                                type="text"
                                name="fullName"
                                className="form-control"
                                data-validation-error-msg="Không được để trống"
                                data-validation="required"
                                autoCapitalize="words"
                                value={updatedAccount.fullName}
                                onChange={handleChange}
                              />
                              <label>Họ tên</label>
                            </fieldset>
                            <p className="error-msg" />
                          </div>
                          <div className="field">
                            <fieldset className="form-group">
                              <input
                                type="number"
                                className="form-control"
                                id="Phone"
                                pattern="\d+"
                                name="phone"
                                maxLength={12}
                                value={updatedAccount.phone}
                                onChange={handleChange}
                              />
                              <label>Số điện thoại</label>
                            </fieldset>
                          </div>
                          <fieldset className="form-group">
                            <input
                              type="date"
                              name="birthday"
                              className="form-control"
                              data-validation-error-msg="Không được để trống"
                              data-validation="required"
                              autoCapitalize="words"
                              value={updatedAccount.birthday}
                              onChange={handleChange}
                            />
                            <label>Ngày sinh</label>
                          </fieldset>
                          <div className="field">
                            <fieldset className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={updatedAccount.address}
                                onChange={handleChange}
                                required
                              />
                              <label>Địa chỉ</label>
                            </fieldset>
                          </div>
                        </div>
                        <div className="btn-row">
                          <button
                            style={{ marginRight: 10 }}
                            className="btn btn-lg btn-dark-address btn-outline article-readmore btn-close"
                            type="button"
                            onClick={toggleForm}
                          >
                            <span>Hủy</span>
                          </button>
                          <button
                            className="btn btn-lg btn-primary btn-submit"
                            id="addnew"
                            type="submit"
                          >
                            <span>Lưu thay đổi</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
            {activeSection === 'changePassword' && (
              <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                <h1 className="title-head margin-top-0">Đổi mật khẩu</h1>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="page-login">
                      <form onSubmit={handleSubmitPassword}>
                        <input
                          name="FormType"
                          type="hidden"
                          defaultValue="change_customer_password"
                        />
                        <input name="utf8" type="hidden" defaultValue="true" />
                        <p>
                          Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự bao gồm cả chữ in hoa ký tự đặc biệt và số.
                        </p>
                        <div className="form-signup clearfix">
                          <fieldset className="form-group">
                            <label htmlFor="oldPass">
                              Mật khẩu cũ <span className="error">*</span>
                            </label>
                            <input
                              type="password"
                              name="oldPassword"
                              id="oldPass"
                              required=""
                              className="form-control form-control-lg"
                              value={passwordData.oldPassword}
                              onChange={handleChangePassword}
                            />
                          </fieldset>
                          <fieldset className="form-group">
                            <label htmlFor="newPass">
                              Mật khẩu mới <span className="error">*</span>
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              id="newPass"
                              required=""
                              className="form-control form-control-lg"
                              value={passwordData.newPassword}
                              onChange={handleChangePassword}
                            />
                          </fieldset>
                          <fieldset className="form-group">
                            <label htmlFor="confirmPass">
                              Xác nhận lại mật khẩu <span className="error">*</span>
                            </label>
                            <input
                              type="password"
                              name="confirmNewPassword"
                              id="confirmPass"
                              required=""
                              className="form-control form-control-lg"
                              value={passwordData.confirmNewPassword}
                              onChange={handleChangePassword}
                            />
                          </fieldset>
                          <button className="button mt-2 btn-edit-addr btn btn-primary btn-more" type="submit">
                            <i className="hoverButton" />
                            Đặt lại mật khẩu
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileComponent;
