import React, { useState } from 'react'
import Slider from "react-slick";
import ModalZoom from '../util/ModalZoom.jsx';
import AddtoCart from './AddtoCart.jsx';
const ProductSlider = ({ product }) => {
    // Slider
    const [isProductInit, setIsProductInit] = useState(false);
    const [shiftIndex, setShiftIndex] = useState(0);
    const [carouselKey, setCarouselKey] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [sliderActive, setSliderActive] = useState(false);

    const handleProductInit = () => {
        setSliderActive(false); // Đánh dấu slider không còn được thao tác
        if (!isProductInit) {
            setIsProductInit(true);
        }
    };
    const settingsForThumbnails = {
        slidesToShow: 4,
        vertical: true,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        focusOnSelect: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const handleButtonClickShift = (index) => {
        setShiftIndex(index);
        // Cập nhật giá trị của key mỗi khi shiftIndex thay đổi
        setCarouselKey(prevKey => prevKey + 1);
    };

    const settingsForMainCarousel = {
        key: carouselKey, // Sử dụng key để buộc React re-render carousel khi key thay đổi
        autoplay: false,
        autoplaySpeed: 6000,
        dots: false,
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: shiftIndex,
        beforeChange: () => {
            setSliderActive(true); // Đánh dấu slider đang được thao tác
        },
    };


    const handleImageClick = (index) => {
        if (!sliderActive) {
            setSelectedImageIndex(index);
            setModalIsOpen(true);
        }
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImageIndex(null);

    };
    return (
        <div> <section className='section mt-0 mb-lg-4 mb-3 mb-sm-0'>
            <div className="container">
                <div className="section wrap-padding-15 wp_product_main m-0">
                    <div className="details-product">
                        <div className="row m-sm-0">
                            <div className="product-detail-left product-images bg-white py-3 col-12 col-lg-6 overflow-hidden">
                                <div className="section slickthumb_relative_product_1">
                                    <Slider {...settingsForThumbnails} id="gallery_02">
                                        {product.imageProductEntity.map((imageProduct, index) => (
                                            <div className={`item ${shiftIndex === index ? 'selected' : ''}`} key={index}>
                                                <a onClick={() => handleButtonClickShift(index)} data-zoom-image={imageProduct.image}>
                                                    <img className="img-fluid" data-img={imageProduct.image} src={imageProduct.image} alt={`Image ${index}`} loading="lazy" />
                                                </a>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                <div className="pt-0 col_large_default large-image">
                                    <Slider {...settingsForMainCarousel} id="gallery_1" afterChange={handleProductInit}>
                                        {product.imageProductEntity.map((imageProduct, index) => (
                                            <div className="item"
                                                data-src={imageProduct.image} key={index}>
                                                <a onClick={() => handleImageClick(index)} className="d-block pos-relative embed-responsive embed-responsive-1by1">
                                                    <picture>
                                                        <source media="(max-width: 480px)"
                                                            srcSet={imageProduct.image} />
                                                        <img loading="lazy" className=" img-fluid" style={{ '--image-scale': '1', cursor: "pointer" }}
                                                            data-img={imageProduct.image}
                                                            src={imageProduct.image}
                                                            alt={imageProduct.image} width="600" height="600"
                                                            data-src={imageProduct.image} />
                                                    </picture>
                                                </a>
                                            </div>
                                        ))}
                                    </Slider>
                                    <ModalZoom images={product.imageProductEntity} isOpen={modalIsOpen} onClose={closeModal} selectedImageIndex={selectedImageIndex} />
                                    <div className='share-group d-flex justify-content-center align-items-center mt-5'>
                                        <strong className='share-group__heading mr-3'>Chia sẻ</strong>
                                        <div className='share-group__list'>
                                            <a className='share-group__item facebook' target="_blank">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                            <a className='share-group__item messenger d-lg-none' target="_blank">
                                                <i className="fab fa-facebook-messenger"></i>
                                            </a>
                                            <a className='share-group__item pinterest' target="_blank">
                                                <i className="fab fa-pinterest-p"></i>
                                            </a>
                                            <a className='share-group__item twitter' target="_blank">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AddtoCart product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default ProductSlider