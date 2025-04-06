import React, { useRef, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { REST_API_BASE_URL } from '../services/ProductService';
import axios from 'axios';
import Swal from 'sweetalert2';


const MyPayPalButton = ({ total, currency, orderData, token, updateCart, description }) => {


  const orderDataRef = useRef({ ...orderData, statusPay: 'Đã thanh toán' });

  // Cập nhật ref khi orderData thay đổi
  useEffect(() => {
    orderDataRef.current = { ...orderData, statusPay: 'Đã thanh toán' };
  }, [orderData]);

  //  const convertVNDtoUSD = (amountVND) => {
  //   // Giả sử tỷ giá 1 USD = 23,000 VND
  //   const exchangeRate = 23000;
  //   return (amountVND / exchangeRate).toFixed(2);
  // };

  // API
  const convertCurrency = async (total) => {
    const url = `https://api.apilayer.com/exchangerates_data/convert?to=USD&from=VND&amount=${total}`;
    try {
      const response = await fetch(url, {
        headers: {
          apikey: "ql75lcTRsSTM4fOXovHfVOHWK6NcYPB4",
        },
      });
      const data = await response.json();
      return data.result.toFixed(2);
    } catch (error) {
      console.error("Error converting currency:", error);
      throw error;
    }
  };
  return (
    <PayPalScriptProvider options={{ "client-id": "Abo90Wztq8vanhzw0EO5zMhum7b1O6aI_1x4BTA8v7jqNIOGdthWxF-ZZpjhtEGg6CW0VWRdgg_hjdlb" }}>
      <PayPalButtons
        createOrder={async (data, actions) => {
          try {
            const totalUSD = await convertCurrency(total);
            const response = await fetch(`${REST_API_BASE_URL}/api/paypal/create-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                total: totalUSD,
                currency: 'USD', // Đổi currency thành USD
                method: 'paypal',
                intent: 'sale',
                description,
              }),
            });
            const order = await response.json();
            if (order.approvalUrl) {
              return order.approvalUrl.split('token=')[1];
            } else {
              throw new Error('Error creating payment');
            }
          } catch (error) {
            console.error('Error in createOrder:', error);
            throw error;
          }
        }}
        onApprove={(data, actions) => {
          return fetch(`${REST_API_BASE_URL}/api/paypal/execute-payment?paymentId=${data.paymentID}&PayerID=${data.payerID}`)
            .then(response => response.text())
            .then(result => {
              if (result.includes('Payment successful')) {
                axios.post('http://localhost:8080/sugarnest/v0.1/orders', orderDataRef.current, {
                  headers: {
                    "Authorization": `Bearer ${token}`
                  }
                })
                  .then(response => {
                    updateCart(response.data.result);
                    Swal.fire({
                      icon: 'success',
                      title: 'Đặt hàng',
                      text: 'Đặt hàng thành công!',
                    });
                  })
                  .catch(error => {
                    console.error('There was an error placing the order:', error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Đặt hàng',
                      text: 'Đặt hàng thất bại. Vui lòng thử lại!',
                    });
                  });
              } else {
                throw new Error('Payment failed');
              }
            })
            .catch(error => {
              console.error('Payment execution error:', error);
              alert('Payment execution failed');
            });
        }}
        onError={(err) => {
          console.error('PayPal Checkout onError', err);
          alert('An error occurred during the transaction');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default MyPayPalButton;