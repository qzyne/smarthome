import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,  // Đăng ký CategoryScale cho trục X
    LinearScale,    // Đăng ký LinearScale cho trục Y
    BarElement,     // Đăng ký BarElement để vẽ các biểu đồ dạng thanh
    Title,          // Đăng ký Title để hiển thị tiêu đề
    Tooltip,        // Đăng ký Tooltip để hiển thị tooltip
    Legend          // Đăng ký Legend để hiển thị chú giải
  );
  
const BarChartFrequency = ({ selectedFilter, chartData, labels }) => {
    return (
      <Bar
        data={{
          labels: labels[selectedFilter],
          datasets: [
            {
              label: 'Tần suất (kWh)',
              data: chartData,
              backgroundColor: '#D4C5A7',
              borderColor: '#D3C4A6',
              borderWidth: 1,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              type: 'category', // Đảm bảo trục X sử dụng scale category
            },
            y: {
              type: 'linear', // Đảm bảo trục Y sử dụng scale linear
            },
          },
        }}
      />
    );
  };
  
  export default BarChartFrequency;