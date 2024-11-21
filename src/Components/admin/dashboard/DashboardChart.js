import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './DashboardChart.css';

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 15, 17, 14, 15, 16, 17, 18, 19, 20, 21],
        fill: true,
        borderColor: '#4D96FF',
        backgroundColor: 'rgba(77, 150, 255, 0.1)',
        tension: 0.4
      },
      {
        label: 'Revenue',
        data: [15, 22, 18, 20, 17, 18, 19, 20, 21, 22, 23, 24],
        fill: true,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Sales Overview</h3>
        <div className="chart-filters">
          <button className="active">Today</button>
          <button>Yesterday</button>
          <button>7 days</button>
          <button>30 days</button>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardChart; 