import React, { useState } from 'react';

const QuantityInput = ({ initialQuantity = 1 }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else if (event.target.value === '') {
            setQuantity('');
        }
    };

    const handleBlur = () => {
        if (quantity === '') {
            setQuantity(1);
        }
    };

    return (
        <div className="custom input_number_product custom-btn-number">
            <button className="btn btn_num num_1 button button_qty" type="button" onClick={handleDecrease}>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <input
                required
                type="text" 
                name="quantity"
                value={quantity}
                maxLength="3"
                className="form-control prd_quantity pd-qtym"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <button className="btn btn_num num_2 button button_qty" type="button" onClick={handleIncrease}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default QuantityInput;
