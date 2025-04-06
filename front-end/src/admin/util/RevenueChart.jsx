import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
import { REST_API_BASE_URL } from '../service/AdminService';

ChartJS.register(BarElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const RevenueChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Doanh thu',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  const [startMonth, setStartMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [startYear, setStartYear] = useState(new Date().getFullYear()); // Default to current year
  const [endMonth, setEndMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [endYear, setEndYear] = useState(new Date().getFullYear()); // Default to current year
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REST_API_BASE_URL}/orders/revenue`, {
          headers: { "Authorization": `Bearer ${token}` },
          params: {
            startMonth: startMonth,
            startYear: startYear,
            endMonth: endMonth,
            endYear: endYear
          }
        });
        const data = response.data.result;

        const labels = Object.keys(data);
        const revenue = Object.values(data);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Doanh thu',
              data: revenue,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchData();
  }, [startMonth, startYear, endMonth, endYear, token]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleStartMonthChange = (event) => {
    setStartMonth(event.target.value);
  };

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
  };

  const handleEndMonthChange = (event) => {
    setEndMonth(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };

  return (
    <div className="tile">
      <h3 className="tile-title">Thống kê doanh thu</h3>
      <div>
        <label>
          Từ tháng:
          <select value={startMonth} onChange={handleStartMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label>
          Năm:
          <input type="number" value={startYear} onChange={handleStartYearChange} min="2000" max="2100" />
        </label>
        <br></br>
        <label>
          Đến tháng:
          <select value={endMonth} onChange={handleEndMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label>
          Năm:
          <input type="number" value={endYear} onChange={handleEndYearChange} min="2000" max="2100" />
        </label>
      </div>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
