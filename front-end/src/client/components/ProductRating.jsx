import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import { REST_API_BASE_URL } from '../services/ProductService';

const ProductRating = ({ productId, accountId }) => {
    const [rating, setRating] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const [isRated, setIsRated] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get(`${REST_API_BASE_URL}/ratings/avg?productId=${productId}`)
            .then(response => {
                setAvgRating(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching average rating:', error);
            });
    }, [productId]);

    useEffect(() => {
        if (accountId && productId) {
            axios.get(`${REST_API_BASE_URL}/ratings/purchases/check?accountId=${accountId}&productId=${productId}`)
                .then(response => {
                    setIsPurchased(response.data.result);
                })
                .catch(error => {
                    console.error('Error checking purchase status:', error);
                });

            axios.get(`${REST_API_BASE_URL}/ratings?accountId=${accountId}&productId=${productId}`)
                .then(response => {
                    if (response.data) {
                        if (response.data.result) {
                            setRating(response.data.result.numberStar); 
                            setIsRated(true);
                        }
                    }
                    setLoading(false); 
                })
                .catch(error => {
                    console.error('Error fetching rating:', error);
                    setLoading(false); 
                });
        }
    }, [productId, accountId]);

    const handleRatingChange = (newRating) => {
        if (accountId && productId) {
            if (!isPurchased) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Thông báo',
                    text: 'Bạn phải mua sản phẩm này trước khi đánh giá.',
                });
                return;
            }

            const ratingData = {
                accountId,
                productId,
                numberStar: newRating
            };

            if (isRated) {
                // Sửa đánh giá
                axios.put(`${REST_API_BASE_URL}/ratings`, ratingData)
                    .then(response => {
                        setRating(newRating);
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: 'Đánh giá của bạn đã được cập nhật.',
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Không thể cập nhật',
                            text: 'Bạn đã hết lược chỉnh sửa đánh giá.',
                        });
                    });
            } else {
                // Tạo mới đánh giá
                axios.post(`${REST_API_BASE_URL}/ratings`, ratingData)
                    .then(response => {
                        setRating(newRating);
                        setIsRated(true);
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: 'Đánh giá của bạn đã được lưu.',
                        });
                    })
                    .catch(error => {
                        console.error('Error creating rating:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Có lỗi xảy ra khi lưu đánh giá.',
                        });
                    });
            }
        }
    };

    return (
        <div>
            <strong>Đánh giá trung bình:</strong> {avgRating !== 0 ? `${avgRating} sao` : 'Chưa có đánh giá'}
            <br />
            <br />
            <strong>Đánh giá sản phẩm:</strong>
            {loading ? (
                <p>Đang tải...</p> 
            ) : (
                <Rating
                    count={5}
                    value={rating}
                    onChange={handleRatingChange}
                    size={24}
                    activeColor="#ffd700"
                />
            )}
        </div>
    );
};

export default ProductRating;
