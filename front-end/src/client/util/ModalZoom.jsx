import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
Modal.setAppElement('#root');

const ModalZoom = ({ images, isOpen, onClose, selectedImageIndex }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Kiểm tra kích thước màn hình để xác định xem có phải là thiết bị di động hay không
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Đặt trạng thái là thiết bị di động
      } else {
        setIsMobile(false); // Đặt trạng thái không phải là thiết bị di động
      }
    };

    // Gọi hàm handleResize khi kích thước màn hình thay đổi
    window.addEventListener('resize', handleResize);

    // Gọi hàm handleResize khi component được render
    handleResize();

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return null; // Không render modal trên thiết bị di động
  }

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    dots: false,
    initialSlide: selectedImageIndex
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Zoom Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99999
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '70%',
          overflowY: 'hidden' // Ẩn thanh cuộn dọc
        }
      }}
    >
      <div style={{ textAlign: 'center', height: '100%' }}>
        <Slider {...settings}>
        {images.map((image, index) => (
           <div key={index} style={{ display: 'inline-block', maxHeight: '100%', verticalAlign: 'middle' }}>
           <img src={image.image} alt="as" style={{ maxWidth: '100%', maxHeight: '100%', display: 'inline-block', verticalAlign: 'middle' }} />
         </div>
           ))}
        </Slider>
      </div>
    </Modal>
  );
};

export default ModalZoom;
