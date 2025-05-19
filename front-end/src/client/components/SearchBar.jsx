import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { REST_API_BASE_URL } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {



    return (
        <div className="col-lg-5 col-12 header-center px-lg-0" id="search-header">
            <form className="input-group search-bar custom-input-group" role="search" >
                <input
                    type="text"
                    name="query"
                    autoComplete="off"
                    className="input-group-field auto-search form-control"
                    required
                    placeholder="Bạn cần tìm gì?"

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
                                backgroundColor: '#0074bf',
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
                            Kết quả tìm kiếm cho <span className="text-danger"></span>
                        </strong>
                    </div>

                </div>
            )}
        </div>
    );
};

export default SearchBar;
