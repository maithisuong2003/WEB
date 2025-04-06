import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { REST_API_BASE_URL } from '../service/AdminService';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const OrderChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REST_API_BASE_URL}/orders/admin-orders`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = response.data.result;

        const labels = data.map(order => new Date(order.createAt).toLocaleDateString('vi-VN'));
        const orderCounts = labels.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(orderCounts),
          datasets: [
            {
              label: 'Số lượng đơn hàng',
              data: Object.values(orderCounts),
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="tile">
      <h3 className="tile-title">Dữ liệu đơn hàng</h3>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default OrderChart;
