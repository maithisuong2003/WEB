import React, { useEffect, useState } from 'react';
import ItemProductComponent from './ItemProduct'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { REST_API_BASE_URL } from '../services/ProductService';

const SearchResults = () => {
    const { search } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProducts();
    }, [search, currentPage]);

    const fetchProducts = async () => {
        if (search) {
            try {
                const response = await axios.get(`${REST_API_BASE_URL}/products/search/${encodeURIComponent(search)}`, {
                    params: {
                        page: currentPage - 1, // Spring Data JPA pages are 0-indexed
                        size: 12,
                    },
                });
                const data = response.data;
                setProducts(data.result.content);
                setTotalPages(data.result.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <section className="signup section search-main wrap_background background_white">
            <div className="container py-3 mb-4">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-bottom-15">
                    <h1 className="title-head">Các kết quả tìm kiếm phù hợp với: {search}</h1>
                </div>
                <div className="main_container collection col-lg-9 col-12 pl-lg-0">
                    <div className="filter-content aside-filter">
                        <div className="filter-container">
                            <div className="filter-container__selected-filter" style={{ display: 'none' }}>
                                <div className="filter-container__selected-filter-list mb-2 ">
                                    <ul></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-products products">
                        <div className="products-view products-view-grid collection_reponsive list_hover_pro">
                            <div className="row product-list content-col">
                                {products.map(product => (
                                    <ItemProductComponent key={product.id} product={product} />
                                ))}
                            </div>
                            <div className="section pagenav">
                                <nav className="clearfix relative nav_pagi w_100">
                                    {totalPages > 1 && (
                                        <ul className="pagination clearfix float-right">
                                            {currentPage !== 1 && (
                                                <li className="page-item">
                                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}><i className="fa fa-angle-left"></i></button>
                                                </li>
                                            )}
                                            {[...Array(totalPages)].map((_, i) => (
                                                <li key={i} className={currentPage === i + 1 ? "active page-item disabled" : "page-item"}>
                                                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                                                </li>
                                            ))}
                                            {currentPage !== totalPages && (
                                                <li className="page-item">
                                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}><i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default SearchResults;
