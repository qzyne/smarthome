import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,  // Đăng ký CategoryScale cho trục X
    LinearScale,    // Đăng ký LinearScale cho trục Y
    LineElement,    // Đăng ký LineElement để vẽ các biểu đồ dạng đường
    PointElement,   // Đăng ký PointElement cho các điểm trên biểu đồ
    Title,          // Đăng ký Title để hiển thị tiêu đề
    Tooltip,        // Đăng ký Tooltip để hiển thị tooltip
    Legend          // Đăng ký Legend để hiển thị chú giải
);

const ConditionChart = ({ selectedFilterRoom, chartDataRoom, labelsRoom }) => {
    return (
        <Line
            data={{
                labels: labelsRoom[selectedFilterRoom],
                datasets: [
                    {
                        label: 'Tần suất (kWh)',
                        data: chartDataRoom,
                        borderColor: '#77BEE4', // Màu đường
                        backgroundColor:'#77BEE4', // Màu vùng dưới đường
                        borderWidth: 2,
                        fill: true, // Đổ màu dưới đường (nếu cần)
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

export default ConditionChart;