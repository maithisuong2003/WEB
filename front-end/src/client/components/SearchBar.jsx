import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { REST_API_BASE_URL } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';

const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const searchResultsRef = useRef(null);

    useOutsideClick(searchResultsRef, () => {
        setShowResults(false);
    });

    const getProduct = (id) => {
        navigate(`/product/${id}`);
        setShowResults(false);
    };
    const getSearchResults = (query) => {
        navigate(`/search/${query}`);
        setShowResults(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${REST_API_BASE_URL}/products/search/${encodeURIComponent(searchQuery)}`);
                const data = await response.json();
                setResults(data.result.content);
            } catch (error) {
                console.error(error);
            }
        };

        const debouncedFetchData = debounce(fetchData, 500);

        if (searchQuery) {
            debouncedFetchData();
        } else {
            setResults([]);
            setShowResults(false);
        }

        return () => {
            debouncedFetchData.cancel();
        };
    }, [searchQuery]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setShowResults(e.target.value !== '');
    };

    const formatCurrency = (price) => {
        return `${parseInt(price).toLocaleString('it-IT')}đ`;
    };
    const handleFormSubmit = (event) => {
        event.preventDefault()
        getSearchResults(searchQuery);
    };


    return (
        <div className="col-lg-5 col-12 header-center px-lg-0" id="search-header">
            <form className="input-group search-bar custom-input-group" role="search" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="query"
                    autoComplete="off"
                    className="input-group-field auto-search form-control"
                    required
                    placeholder="Bạn cần tìm gì?"
                    value={searchQuery}
                    onChange={handleInputChange}
                    style={{
                        border: '1px solid gray',
                        borderTopLeftRadius: '30px',
                        borderBottomLeftRadius: '30px',
                        borderRight: 'none',
                    }}
                />
                <input type="hidden" name="type"/>
                <span className="input-group-btn btn-action">
                    <button type="submit" aria-label="search" className="btn text-white icon-fallback-text h-100"
                            style={{
                                backgroundColor: '#19b0ab',
                                border: '1px solid #19b0ab',
                                borderTopRightRadius: '30px',
                                borderBottomRightRadius: '30px',
                                borderLeft: 'none',
                                padding: '0 16px',
                            }}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </span>
            </form>

            {showResults && (
                <div className="card search-results-card" ref={searchResultsRef}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <strong style={{color: 'black'}}>
                            Kết quả tìm kiếm cho <span className="text-danger">{searchQuery}</span>
                        </strong>
                    </div>
                    <div className="card-body overflow-auto" style={{maxHeight: '300px'}}>
                        {results.length > 0 ? (
                            results.map((item) => (
                                <a
                                    key={item.id}
                                    className="text-decoration-none d-flex align-items-center border-bottom py-2"
                                    onClick={() => getProduct(item.id)}
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.imageProductEntity[0].image}
                                            alt={item.nameProduct}
                                            className="img-fluid"
                                            style={{width: '70px', height: '70px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="mb-0">{item.nameProduct}</h6>
                                        <div className="mt-1">
                                            <ins className="text-success fw-bold me-2">
                                                {formatCurrency(item.sizeColorProductsEntity[0].discountPrice)}
                                            </ins>
                                            {item.sizeColorProductsEntity[0].originalPrice && (
                                                <del className="text-muted">
                                                    {formatCurrency(item.sizeColorProductsEntity[0].originalPrice)}
                                                </del>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <p>Không có kết quả</p>
                        )}
                    </div>
                    <div className="card-footer text-center">
                        <a onClick={() => getSearchResults(searchQuery)} className="text-decoration-none">
                            Xem tất cả sản phẩm có chứa <span className="text-danger">{searchQuery}</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
