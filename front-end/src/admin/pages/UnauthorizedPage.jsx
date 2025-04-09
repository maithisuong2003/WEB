// UnauthorizedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  function getHome() {
    navigate('/');
  }
  return (
      <div className="row" style={{marginTop:'10%'}}>
        <div className="col-lg-12">
          <div className="page-404 text-center">
            <img
              className="img-fluid"
              src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/404.png?1704435927037"
              alt={404}
              width={600}
              height={264}
            />
            <h1
              className="title-section-page"
              style={{ fontSize: 30, marginTop: 40 }}
            >
              TRANG KHÔNG ĐƯỢC TÌM THẤY
            </h1>
            <p style={{ color: "#727272" }}>
              Thật tiếc! Trang của bạn yêu cầu không tồn tại. <br />
              Vui lòng thử với một trang khác hoặc liên hệ để được hỗ trợ nhé!
            </p>
            <a href="/" className="btn btn-main btn-secondary">
              Về trang chủ
            </a>
          </div>
        </div>
      </div>

  );
};

export default UnauthorizedPage;
