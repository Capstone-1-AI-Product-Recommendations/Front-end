import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
} from 'chart.js';
import './DashboardChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
);

const DashboardChart = () => {
  const [chartType, setChartType] = useState('line');
  
  const metrics = {
    overallSales: '12 Millions',
    overallEarnings: '78 Millions', 
    overallRevenue: '60 Millions',
    newCustomers: '23k'
  };

  const lineData = {
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

  const pieData = {
    labels: ['Overall Sales', 'Overall Earnings', 'Overall Revenue', 'New Customers'],
    datasets: [{
      data: [12, 78, 60, 23],
      backgroundColor: [
        '#4D96FF',
        '#4CAF50',
        '#FF6B6B',
        '#FFB946'
      ]
    }]
  };

  const barData = {
    labels: ['Overall Sales', 'Overall Earnings', 'Overall Revenue', 'New Customers'],
    datasets: [{
      label: 'Metrics',
      data: [12, 78, 60, 23],
      backgroundColor: [
        '#4D96FF',
        '#4CAF50',
        '#FF6B6B', 
        '#FFB946'
      ]
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    } : {}
  };

  return (
    <div className="dashboard-container">
      <div className="metrics-list">
        <div className="metric-item">
          <span className="metric-dot blue"></span>
          <div className="metric-content">
            <p>Overall Sales</p>
            <h4>12 Millions</h4>
          </div>
        </div>
        <div className="metric-item">
          <span className="metric-dot green"></span>
          <div className="metric-content">
            <p>Overall Earnings</p>
            <h4>78 Millions</h4>
          </div>
        </div>
        <div className="metric-item">
          <span className="metric-dot red"></span>
          <div className="metric-content">
            <p>Overall Revenue</p>
            <h4>60 Millions</h4>
          </div>
        </div>
        <div className="metric-item">
          <span className="metric-dot orange"></span>
          <div className="metric-content">
            <p>New Customers</p>
            <h4>23k</h4>
          </div>
        </div>
      </div>

      <div className="chart-wrapper">
        <div className="chart-header">
          <div className="chart-type-selector">
            <button 
              className={chartType === 'line' ? 'active' : ''} 
              onClick={() => setChartType('line')}
            >
              Line Chart
            </button>
            <button 
              className={chartType === 'pie' ? 'active' : ''} 
              onClick={() => setChartType('pie')}
            >
              Pie Chart
            </button>
            <button 
              className={chartType === 'bar' ? 'active' : ''} 
              onClick={() => setChartType('bar')}
            >
              Bar Chart
            </button>
          </div>
          <div className="chart-filters">
            <button className="active">Today</button>
            <button>Yesterday</button>
            <button>7 days</button>
            <button>15 days</button>
            <button>30 days</button>
          </div>
        </div>
        <div className="chart-area">
          {chartType === 'line' && <Line data={lineData} options={options} height={240} />}
          {chartType === 'pie' && <Pie data={pieData} options={options} height={240} />}
          {chartType === 'bar' && <Bar data={barData} options={options} height={240} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;