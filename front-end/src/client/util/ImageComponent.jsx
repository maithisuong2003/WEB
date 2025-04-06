import React from 'react';
import { REST_API_BASE_URL } from '../services/ProductService';

const ImageComponent = ({ fileName }) => {
    const imageUrl = `${REST_API_BASE_URL}/images/${fileName}`;
    
    return (
        <div>
            <img src={imageUrl} alt={fileName} />
        </div>
    );
};

export default ImageComponent;
