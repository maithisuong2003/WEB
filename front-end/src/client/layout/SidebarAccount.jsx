import React from 'react';

const SidebarAccount = ({user, activeSection, setActiveSection }) => {
    
    return (
        <div className="col-xs-12 col-sm-12 col-lg-15 col-left-ac">
            <div className="block-account">
                <h5 className="title-account">Trang tài khoản</h5>
                <p>
                    Xin chào, <span style={{ color: "#a50a06" }}>{user.fullName}</span>
                    &nbsp;!
                </p>
                <ul>
                    <li>
                        <a
                            className={`title-info ${activeSection === 'accountInfo' ? 'active' : ''}`}
                            onClick={() => setActiveSection('accountInfo')}
                        >
                            Thông tin tài khoản
                        </a>
                    </li>
                    <li>
                        <a
                            className={`title-info ${activeSection === 'changePassword' ? 'active' : ''}`}
                            onClick={() => setActiveSection('changePassword')}
                        >
                            Đổi mật khẩu
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarAccount;