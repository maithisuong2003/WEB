import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../services/ProductService.js'

const Sidebar = () => {

  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    listCategories().then((response) => {
      setCategories(response.data.result)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  function getListProduct() {
    navigate(`/products`)
  }
  return (
    <div>
      <div className="navigation-wrapper">
        <nav className="h-100">
          <ul className="navigation list-group list-group-flush scroll">
            <li className="menu-item list-group-item">
              <a onClick={getListProduct} className="menu-item__link" title="Tổng hơp khuyến mãi">
                <img loading="lazy" width='24' height='24'
                  src="https://bizweb.dktcdn.net/100/419/628/themes/897067/assets/menu_icon_1.png?1704435927037"
                  alt="Tổng hơp khuyến mãi" />
                <span>Tổng hơp khuyến mãi</span>
              </a>
            </li>
            <li className="menu-item list-group-item">
              <a onClick={() => navigate(`/products`)} className="menu-item__link" title="Tổng hơp khuyến mãi">
                <img loading="lazy" width='24' height='24'
                  src="https://bizweb.dktcdn.net/100/419/628/themes/897067/assets/menu_icon_2.png?1704435927037"
                  alt="Tổng hơp khuyến mãi" />
                <span>Bộ sưu tập bánh</span>
              </a>
            </li>
            {
              categories.map((category, index) => {
                return (
                  <li key={index} className="menu-item list-group-item">
                    <a onClick={() => navigate(`/products/${category.nameCategory}`)} className="menu-item__link" title={category.nameCategory}>
                      <img loading="lazy" width='24' height='24'
                        src={category.imageCategory ? category.imageCategory : "https://bizweb.dktcdn.net/100/419/628/themes/897067/assets/menu_icon_1.png?1704435927037"}
                        alt="Tổng hơp khuyến mãi" />
                      <span>{category.nameCategory}</span>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </div>
      <ul style={{ backgroundColor: 'white' }} className="shop-policises list-unstyled mb-0 pr-0">
        <li>
          <img className="img-fluid"
            src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/policy_header_image_1.png?1704435927037"
            loading="lazy" width="24" height="24" alt="Giao hàng đúng giờ" />
          <a className="link" title="Giao hàng đúng giờ">Giao hàng đúng
            giờ</a>
        </li>
        <li>
          <img className="img-fluid"
            src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/policy_header_image_2.png?1704435927037"
            loading="lazy" width="24" height="24" alt="Miễn phí đổi trả trong 7 ngày" />
          <a className="link" title="Miễn phí đổi trả trong 7 ngày">Miễn phí
            đổi trả trong 7 ngày</a>
        </li>
        <li>
          <img className="img-fluid"
            src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/policy_header_image_3.png?1704435927037"
            loading="lazy" width="24" height="24" alt="Ưu đãi hấp dẫn mỗi ngày" />
          <a className="link" title="Ưu đãi hấp dẫn mỗi ngày">Ưu đãi hấp dẫn mỗi
            ngày</a>
        </li>
        <li className='hotline'>
          <img loading="lazy"
            src="//bizweb.dktcdn.net/100/419/628/themes/897067/assets/phone-icon.png?1704435927037"
            width="24" height="24" className="align-self-center" alt="phone-icon" />
          <a className="media-body d-md-flex flex-column d-none" href="tel:18001818" title="18001818">
            <strong>
              Gọi mua hàng: 18001818
            </strong>
            <span>(8:00 - 19:00 T2 - CN)</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
export default Sidebar