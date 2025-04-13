import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

const StoreAddress = () => {
    return (
        <div>
            <Breadcrumb page="Hệ thống cửa hàng" />
            <div className="page_contact section ">
                <div className="container py-3">
                    <div className="ega-row--grid">
                        <div id="map">
                            <div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2145255159858!2d106.78918677583908!3d10.871281657435308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2sUniversity%20of%20Agriculture%20and%20Forestry!5e0!3m2!1sen!2s!4v1718446733206!5m2!1sen!2s"
                                    width={1200}
                                    height={500}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreAddress