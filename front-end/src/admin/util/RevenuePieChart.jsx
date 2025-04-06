import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';
import { REST_API_BASE_URL } from '../service/AdminService';

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenuePieChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRevenueByCategory = async () => {
            try {
                const response = await axios.get(`${REST_API_BASE_URL}/orders/revenue-by-category`, {
                    headers: { "Authorization": `Bearer ${token}` },
                    params: {
                        month: month,
                        year: year
                    }
                });

                if (response.status === 200) {
                    const data = response.data.result;
                    const labels = Object.keys(data);
                    const revenues = Object.values(data);
                    const backgroundColors = [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ];
                    const borderColors = [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ];

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Doanh thu',
                                data: revenues,
                                backgroundColor: backgroundColors.slice(0, labels.length),
                                borderColor: borderColors.slice(0, labels.length),
                                borderWidth: 1,
                            },
                        ],
                    });
                } else {
                    console.error('Error fetching revenue data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueByCategory();
    }, [month, year, token]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <div className="tile">
            <h3 className="tile-title">Doanh thu trong tháng theo loại danh mục hàng hoá</h3>
            <div>
                <label>
                    Tháng:
                    <select value={month} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Năm:
                    <input type="number" value={year} onChange={handleYearChange} min="2000" max="2100" />
                </label>
            </div>
            <Pie ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default RevenuePieChart;
